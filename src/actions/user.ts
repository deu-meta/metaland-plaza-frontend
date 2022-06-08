import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';

import { UserContext } from '../context/user';
import { IPaginated } from '../models/pagination';
import { IUser } from '../models/user';
import { accountsApiClient } from '../services/api';

export { useUser, useUserRefresh, useUserLogout, useUserContext, useUserMe, useUsers, useUserEdit };

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

function useUserMe() {
	return useQuery('userMe', () => accountsApiClient.get<IUser>('/user/me').then(response => response.data));
}

function useUsers(page: number) {
	return useQuery('users', () => accountsApiClient.get<IPaginated<IUser[]>>(`/users?page=${page}`).then(response => response.data));
}

function useUserEdit(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, Pick<IUser, 'id'> & Partial<Omit<IUser, 'date_joined' | 'last_login'>>>(
		user => accountsApiClient.put(`/users/${user.id}`, user).then(response => response.data),
		options,
	);
}
