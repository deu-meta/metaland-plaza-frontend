import React from 'react';
import { Route, Routes } from 'react-router';

import { MtlBaseLayout } from './layouts/MtlBaseLayout';
import { Index } from './pages/Index';
import { Login, LoginCallback } from './pages/Login';
import { MinecraftMap } from './pages/MinecraftMap';
import { NavBarEdit } from './pages/NavBarEdit';
import { NoticeAdd } from './pages/NoticeAdd';
import { Notices } from './pages/Notices';
import { Notion } from './pages/Notion';
import { Profile } from './pages/Profile';
import { Users } from './pages/Users';

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
				<Route
					path="notices/*"
					element={
						<Routes>
							<Route index element={<Notices />} />
							<Route path=":pageId" element={<Notion />} />
							<Route path="add" element={<NoticeAdd />} />
						</Routes>
					}
				/>
				<Route path="map" element={<MinecraftMap />} />
				<Route path="profile" element={<Profile />} />

				<Route path="navbar" element={<NavBarEdit />} />
				<Route path="users" element={<Users />} />
			</Route>
		</Routes>
	);
};
