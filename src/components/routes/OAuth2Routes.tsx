import React from 'react';
import { Route, Routes } from 'react-router';

import { OAuth2Callback, OAuth2Index } from '../pages/OAuth2';

export { OAuth2Routes };

const OAuth2Routes: React.FC = () => {
	return (
		<Routes>
			<Route index element={<OAuth2Index />} />
			<Route path="callback" element={<OAuth2Callback />} />
		</Routes>
	);
};
