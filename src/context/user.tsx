import { AxiosRequestHeaders } from 'axios';
import jwt_decode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

import { IUser } from '../models/user';
import { accountsApiClient, setAccessToken } from '../services/api';

export { UserContext, UserProvider };

const UserContext = createContext<{
	user: IUser | null;
	refresh: UseQueryResult;
	logout: UseQueryResult;
} | null>(null);

const withoutAuthorization = {
	transformRequest: (data: any, headers: AxiosRequestHeaders | undefined) => {
		// refresh endpoint only accepts cookie, NOT Authorization header
		delete (headers as any)?.common['authorization'];
		delete (headers as any)?.common['Authorization']; // axios type mismatch WTF
		return data;
	},
};

const UserProvider: React.FC = props => {
	const { children } = props;
	const refresh = useQuery(
		'/jwt/refresh',
		() =>
			accountsApiClient
				.post<{ access_token: string }>('/jwt/refresh', undefined, withoutAuthorization)
				.then(response => response.data),
		{
			retry: false,
			refetchInterval: false,
			refetchOnWindowFocus: false,
		},
	);
	const logout = useQuery('/jwt/delete', () => accountsApiClient.delete('/jwt/delete', withoutAuthorization), {
		enabled: false,
	});

	const [user, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem('user') || 'null'));

	const [initialRefreshDone, setInitialRefreshDone] = useState(false);

	useEffect(() => {
		refresh.refetch().then(() => setInitialRefreshDone(true));
	}, []);

	// login (or refresh) and set user data
	useEffect(() => {
		if (refresh.data !== undefined) {
			setAccessToken(refresh.data.access_token);

			const decoded = jwt_decode<{
				sub: string;
				given_name: string;
				job_title: string;
				display_name: string;
				email: string;
				role: IUser['role'];
				provider: IUser['provider'];
				date_joined: string;
				last_login: string;
			}>(refresh.data.access_token);

			setUser({
				id: decoded.sub,
				given_name: decoded.given_name,
				job_title: decoded.job_title,
				display_name: decoded.display_name,
				email: decoded.email,
				role: decoded.role,
				provider: decoded.provider,
				date_joined: new Date(decoded.date_joined),
				last_login: new Date(decoded.last_login),
			});
		}
	}, [refresh.data]);

	// if refresh failed, refresh token may expired. set user to null.
	useEffect(() => {
		if (refresh.isError) setUser(null);
	}, [refresh.isError]);

	// cache user data
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	// logout and remove all data
	useEffect(() => {
		if (!logout.isLoading && logout.isSuccess) {
			setAccessToken(null);
			setUser(null);
		}
	}, [logout.isLoading, logout.isSuccess]);

	return (
		<UserContext.Provider
			value={{
				user,
				refresh,
				logout,
			}}>
			{initialRefreshDone && children}
		</UserContext.Provider>
	);
};
