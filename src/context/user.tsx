import jwt_decode from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';

import { IUser } from '../models/user';
import { accountsApiClient, setAccessToken } from '../services/api';

export { UserContext, UserProvider, useUser, useUserRefresh, useUserLogout, useUserContext };

const UserContext = createContext<{
	user: IUser | null;
	refresh: UseQueryResult;
	logout: UseQueryResult;
} | null>(null);

const UserProvider: React.FC = props => {
	const { children } = props;
	const refresh = useQuery(
		'/jwt/refresh',
		() =>
			accountsApiClient
				.post<{ access_token: string }>('/jwt/refresh', undefined, {
					transformRequest: (data, headers) => {
						// refresh endpoint only accepts cookie, NOT Authorization header
						delete (headers as any)?.common['Authorization']; // axios type mismatch WTF
						return data;
					},
				})
				.then(response => response.data),
		{
			retry: false,
			refetchInterval: false,
			refetchOnWindowFocus: false,
		},
	);
	const logout = useQuery('/jwt/delete', () => accountsApiClient.delete('/jwt/delete'), {
		enabled: false,
	});

	const [user, setUser] = useState<IUser | null>(JSON.parse(localStorage.getItem('user') || 'null'));

	// login (or refresh) and set user data
	useEffect(() => {
		if (refresh.data !== undefined) {
			setAccessToken(refresh.data.access_token);
			setUser(jwt_decode<IUser>(refresh.data.access_token));
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
			{children}
		</UserContext.Provider>
	);
};

function useUser() {
	const { user } = useContext(UserContext)!;

	return user;
}

function useUserRefresh() {
	const { refresh } = useContext(UserContext)!;

	return refresh;
}

function useUserLogout() {
	const { logout } = useContext(UserContext)!;

	return logout;
}

function useUserContext() {
	return useContext(UserContext)!;
}
