import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { navlinksState } from '../atoms/navlinks';
import { INavLink } from '../models/navlink';
import { plazaApiClient } from '../services/api';

export { useNavlinks, useNavLinksUpdate };

function useNavlinks() {
	const setNavlinks = useSetRecoilState(navlinksState);
	const navlinks = useRecoilValue(navlinksState);
	const query = useQuery<INavLink[]>('navlinks', () => plazaApiClient.get('/navlinks/').then(response => response.data));

	if (query.data !== undefined) setNavlinks(query.data);

	return {
		...query,
		data: navlinks,
		homeNavlink: navlinks[0] ?? {
			name: 'Oasis',
			link: '/notices',
		},
		navlinks: navlinks.slice(1),
	};
}

function useNavLinksUpdate(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, INavLink[]>(
		newNavlinks => plazaApiClient.post('/navlinks/', newNavlinks).then(response => response.data),
		options,
	);
}
