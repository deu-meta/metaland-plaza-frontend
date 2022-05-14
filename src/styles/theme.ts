import { createTheme } from '@mui/material';
import { useMemo } from 'react';

export { useTheme };

function useTheme() {
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						light: '#8547d3',
						main: '#6719C9',
						dark: '#48118c',
					},
					secondary: {
						light: '#f73378',
						main: '#f50057',
						dark: '#ab003c',
					},
				},
				typography: {
					fontFamily: `"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif`,
					fontWeightLight: 300,
					fontWeightRegular: 400,
					fontWeightMedium: 500,
					h1: {
						fontWeight: 700,
					},
				},
			}),
		[],
	);

	return theme;
}
