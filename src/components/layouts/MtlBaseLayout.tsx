import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

import { MtlNavBar } from './MtlNavBar';

export { MtlBaseLayout };

const MtlBaseLayout: React.FC = () => {
	return (
		<Container maxWidth="lg">
			<Box marginTop={4} />
			<MtlNavBar />

			<Box marginTop={4} />
			<Outlet />
		</Container>
	);
};
