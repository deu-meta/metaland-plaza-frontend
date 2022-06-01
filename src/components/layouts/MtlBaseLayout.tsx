import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

import { MtlSpacer } from '../basics/MtlSpacer';
import { MtlNavBar } from './MtlNavBar';

export { MtlBaseLayout };

const MtlBaseLayout: React.FC = () => {
	return (
		<Container maxWidth="lg">
			<MtlSpacer vertical={4} />
			<MtlNavBar />

			<MtlSpacer vertical={4} />
			<Outlet />
		</Container>
	);
};
