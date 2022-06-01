import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { INavLink } from '../models/navlink';

export { navlinksState };

const { persistAtom } = recoilPersist({
	key: 'navlinks',
});

const navlinksState = atom<INavLink[]>({
	key: 'navlinks',
	default: [],
	effects_UNSTABLE: [persistAtom],
});
