import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

import Kakao from '../../resources/icons/kakaotalk.svg';
import Microsoft from '../../resources/icons/microsoft.svg';
import { MtlSpacer } from './MtlSpacer';

export { MtlOAuth2LoginButton };

type MtlOAuth2LoginButtonProps = {
	provider: 'microsoft' | 'kakao';
	href: string;
};

const MtlOAuth2LoginButton: React.FC<MtlOAuth2LoginButtonProps> = props => {
	const { provider, href } = props;
	const theme = useTheme();

	const icon = provider === 'microsoft' ? Microsoft : provider === 'kakao' ? Kakao : undefined;
	const backgroundColor = provider === 'microsoft' ? '#2F2F2F' : provider === 'kakao' ? '#FFCD00' : 'transparent';
	const color = theme.palette.getContrastText(backgroundColor);

	return (
		<a href={href} style={{ display: 'block', textDecoration: 'none' }}>
			<Paper
				sx={{
					display: 'flex',
					alignItems: 'center',
					paddingY: 0.8,
					paddingX: 2.5,
					backgroundColor: backgroundColor,
					color: color,
					cursor: 'pointer',
					userSelect: 'none',
				}}>
				<img src={icon} width={30} />
				<MtlSpacer horizontal={20} />
				<Typography variant="subtitle1">{provider}로 로그인</Typography>
			</Paper>
		</a>
	);
};
