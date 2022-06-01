import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import React from 'react';

export { MtlSpacer };

type MtlSpacerProps = Partial<{
	vertical: BoxProps['height'];
	horizontal: BoxProps['width'];
}>;

const MtlSpacer: React.FC<MtlSpacerProps> = props => {
	const { vertical, horizontal } = props;
	return (
		<Box
			sx={{
				display: 'inline-block',
				...(vertical ? { height: vertical, minHeight: vertical, maxHeight: vertical } : {}),
				...(horizontal ? { width: horizontal, minWidth: horizontal, maxWidth: horizontal } : {}),
			}}
		/>
	);
};
