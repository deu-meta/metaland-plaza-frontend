import { ErrorOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import React from 'react';

export { MtlDialog, MtlDialogTitle, MtlDialogContent };
export type { MtlDialogProps };

const MtlDialogTitle: React.FC = props => {
	const { children } = props;

	return (
		<Typography variant="h4" sx={{ marginBottom: 3 }}>
			{children}
		</Typography>
	);
};

const MtlDialogContent: React.FC = props => {
	const { children } = props;

	return <Typography variant="subtitle1">{children}</Typography>;
};

type MtlDialogProps = {
	severity?: 'info' | 'error';
} & BoxProps;

const MtlDialog: React.FC<MtlDialogProps> = props => {
	const { children, severity = 'info', sx, ...boxProps } = props;

	const Icon = severity === 'info' ? InfoOutlined : severity === 'error' ? ErrorOutlined : InfoOutlined;

	return (
		<Paper elevation={6}>
			<Box
				sx={{
					width: '100%',
					maxWidth: 560,
					minHeight: 220,
					backgroundColor: severity === 'info' ? '#faf8fb' : severity === 'error' ? '#fceded' : '#ffffff',

					padding: 4,
					position: 'relative',
					overflow: 'hidden',
					...sx,
				}}
				{...boxProps}>
				{children}

				<Icon
					sx={{
						fontSize: 180,
						opacity: 0.2,
						position: 'absolute',
						bottom: -40,
						right: -40,
						color: severity === 'error' ? 'red' : undefined,
					}}
				/>
			</Box>
		</Paper>
	);
};
