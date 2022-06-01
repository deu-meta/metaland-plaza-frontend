import React from 'react';
import { Route, Routes } from 'react-router';

import { MtlBaseLayout } from './layouts/MtlBaseLayout';
import { Index } from './pages/Index';
import { Login, LoginCallback } from './pages/Login';

export { AppRoutes };

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MtlBaseLayout />}>
				<Route index element={<Index />} />
				<Route
					path="login/*"
					element={
						<Routes>
							<Route index element={<Login />} />
							<Route path="callback" element={<LoginCallback />} />
						</Routes>
					}
				/>
				<Route path="navbar" element={<NavBarEdit />} />
				<Route path="users" element={<Users />} />
			</Route>
		</Routes>
	);
};
