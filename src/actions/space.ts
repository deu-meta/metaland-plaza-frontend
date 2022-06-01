import { useMutation, useQuery } from 'react-query';

import { IPaginated } from '../models/pagination';
import { ISpace } from '../models/space';
import { plazaApiClient } from '../services/api';

export { useSpaces, useSpace, useSpaceAdd, useSpaceEdit, useSpaceDelete };

function useSpaces(page: number) {
	return useQuery<IPaginated<ISpace[]>>('spaces', () =>
		plazaApiClient.get<IPaginated<ISpace[]>>(`/spaces/?page=${page}`).then(response => response.data),
	);
}

function useSpace(spaceName: string | null) {
	return useQuery<ISpace>(
		['space', spaceName],
		() => plazaApiClient.get<ISpace>(`/spaces/${spaceName}/`).then(response => response.data),
		{ enabled: spaceName !== null },
	);
}

function useSpaceAdd(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, FormData | ISpace>(
		newSpace => plazaApiClient.post('/spaces/', newSpace).then(response => response.data),
		options,
	);
}

function useSpaceEdit(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, FormData | Partial<ISpace>>(
		space =>
			plazaApiClient
				.put(`/spaces/${space instanceof FormData ? space.get('name') : space.name}/`, space)
				.then(response => response.data),
		options,
	);
}

function useSpaceDelete(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, string>(
		spaceName => plazaApiClient.delete(`/spaces/${spaceName}/`).then(response => response.data),
		options,
	);
}
