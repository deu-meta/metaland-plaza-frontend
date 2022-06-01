import { Typography } from '@mui/material';
import React from 'react';

export { MtlPageTitle };

const MtlPageTitle: React.FC = props => {
	const { children } = props;

	return (
		<Typography variant="h3" sx={{ marginTop: 4, marginBottom: 4 }}>
			{children}
		</Typography>
	);
};
