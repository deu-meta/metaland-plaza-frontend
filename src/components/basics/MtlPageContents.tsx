import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import React from 'react';

export type { MtlPageContentsProps };
export { MtlPageContents };

type MtlPageContentsProps = {
	center?: boolean;
	size?: 'small' | 'large';
} & BoxProps;

const MtlPageContents: React.FC<MtlPageContentsProps> = props => {
	const { children, center, size = 'small', sx, ...boxProps } = props;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: center ? 'center' : 'stretch',
				width: '100%',
				maxWidth: size === 'small' ? 720 : undefined,
				marginX: 'auto',
				...sx,
			}}
			{...boxProps}>
			{children}
		</Box>
	);
};
