import { Box, BoxProps, Typography } from '@mui/material';
import React from 'react';

export { MtlDialog, MtlDialogTitle, MtlDialogContent };

const MtlDialogTitle: React.FC = props => {
	const { children } = props;

	return (
		<Typography variant="h4" sx={{ fontWeight: 'light', marginBottom: 3 }}>
			{children}
		</Typography>
	);
};

const MtlDialogContent: React.FC = props => {
	const { children } = props;

	return <Typography variant="subtitle1">{children}</Typography>;
};

const MtlDialog: React.FC<BoxProps> = props => {
	const { children, sx, ...boxProps } = props;

	return (
		<Box
			sx={{
				width: 560,
				height: 220,
				backgroundColor: '#f2ecf9',

				padding: 4,
				...sx,
			}}
			{...boxProps}>
			{children}
		</Box>
	);
};
