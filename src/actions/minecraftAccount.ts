import { useMutation, useQuery } from 'react-query';

import { IMinecraftAccount } from '../models/minecraftAccount';
import { accountsApiClient } from '../services/api';

export { useMinecraftAccountVerifyRead, useMinecraftAccountVerify };

function useMinecraftAccountVerifyRead(code: string | undefined) {
	return useQuery(
		['minecraftAccountVerify', code],
		() => accountsApiClient.get<IMinecraftAccount>(`/minecraft-accounts/verify/${code}`).then(response => response.data),
		{
			enabled: typeof code === 'string',
		},
	);
}

function useMinecraftAccountVerify(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, string>(
		code => accountsApiClient.post(`/minecraft-accounts/verify/${code}`).then(response => response.data),
		options,
	);
}
