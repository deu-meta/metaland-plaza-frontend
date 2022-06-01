import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';

import { UserContext } from '../context/user';
import { IPaginated } from '../models/pagination';
import { IUser } from '../models/user';
import { accountsApiClient } from '../services/api';

export { useUser, useUserRefresh, useUserLogout, useUserContext, useUserMe, useUsers, useUserUpdateRole };

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

function useUserUpdateRole(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, Pick<IUser, 'email' | 'role'>>(
		user => accountsApiClient.put(`/admin/update-role?email=${user.email}&role=${user.role}`, user).then(response => response.data),
		options,
	);
}
