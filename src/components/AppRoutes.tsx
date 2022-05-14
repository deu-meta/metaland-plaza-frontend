import React from 'react';
import { Route, Routes } from 'react-router';

import { MtlBaseLayout } from './layouts/MtlBaseLayout';
import { Index } from './pages/Index';
import { OAuth2Routes } from './routes/OAuth2Routes';

export { AppRoutes };

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MtlBaseLayout />}>
				<Route index element={<Index />} />
				<Route path="oauth2/*" element={<OAuth2Routes />} />
			</Route>
		</Routes>
	);
};
