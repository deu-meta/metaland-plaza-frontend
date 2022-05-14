import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

import { useTheme } from '../styles/theme';
import { AppRoutes } from './AppRoutes';

export { App };

const App: React.FC = () => {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppRoutes />
		</ThemeProvider>
	);
};
