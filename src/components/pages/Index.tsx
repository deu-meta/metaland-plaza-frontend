import React from 'react';
import { useNavigate } from 'react-router';

import { useNavlinks } from '../../actions/navbar';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';

export { Index };

const Index: React.FC = () => {
	const navigate = useNavigate();
	const { homeNavlink } = useNavlinks();
	if (homeNavlink.link !== '/') {
		navigate(homeNavlink.link, { replace: true });
	}

	return (
		<MtlPageContents>
			<MtlPageTitle>비어있는 페이지입니다.</MtlPageTitle>
		</MtlPageContents>
	);
};
