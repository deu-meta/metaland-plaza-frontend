import { Clear } from '@mui/icons-material';
import { Box, IconButton, Paper, Slide, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import React from 'react';

export type { MtlSlideCardProps, MtlSlideCardImageProps, MtlSlideCardTitleProps };
export { MtlSlideCard, MtlSlideCardImage, MtlSlideCardTitle, MtlSlideCardContent };

type MtlSlideCardImageProps = {
	src: string;
} & BoxProps;

const MtlSlideCardImage: React.FC<MtlSlideCardImageProps> = props => {
	const { src, sx, ...boxProps } = props;

	return (
		<Box
			sx={{
				width: '100%',
				height: 240,
				maxHeight: '25vh',
				...sx,
			}}
			{...boxProps}>
			<img
				src={src}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}></img>
		</Box>
	);
};

type MtlSlideCardTitleProps = {
	onClose: () => void;
};

const MtlSlideCardTitle: React.FC<MtlSlideCardTitleProps> = props => {
	const { children, onClose } = props;

	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Typography variant="h5">{children}</Typography>
			<IconButton edge="end" sx={{ marginLeft: 'auto' }} onClick={onClose}>
				<Clear />
			</IconButton>
		</Box>
	);
};

const MtlSlideCardContent: React.FC = props => {
	const { children } = props;

	return <Box sx={{ padding: 2.5 }}>{children}</Box>;
};

type MtlSlideCardProps = {
	title: string;
	image?: string;
	open: boolean;
	onClose: () => void;
};

const MtlSlideCard: React.FC<MtlSlideCardProps> = props => {
	const { children, title, image, open, onClose } = props;

	return (
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<Paper
				sx={{
					maxWidth: 640,
					borderRadius: 6,
					width: '100%',
					paddingBottom: 3,
					position: 'absolute',
					bottom: -24,
					left: 0,
					right: 0,
					marginX: 'auto',
					overflow: 'hidden',
				}}
				elevation={3}>
				{image && <MtlSlideCardImage src={image} />}
				<MtlSlideCardContent>
					<MtlSlideCardTitle onClose={onClose}>{title}</MtlSlideCardTitle>
					{children}
				</MtlSlideCardContent>
			</Paper>
		</Slide>
	);
};
