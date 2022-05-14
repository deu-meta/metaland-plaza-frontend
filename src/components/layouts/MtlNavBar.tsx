import { AppBar, Box, Button, ButtonProps, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/user';
import { NavLink } from '../../models/navlink';
import { plazaApiClient } from '../../services/api';

export { MtlNavBar };

const MtlNavBarButton: React.FC<ButtonProps & { link: string }> = props => {
	const { link, children, ...buttonProps } = props;
	return (
		<Link to={link} style={{ textDecoration: 'none' }}>
			<Button {...buttonProps} sx={{ my: 1, color: 'white', display: 'block' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
					{children}
				</Typography>
			</Button>
		</Link>
	);
};

const MtlNavBar: React.FC = () => {
	const { data: navlinks } = useQuery<NavLink[]>('navlinks', () => plazaApiClient.get('/navlinks/').then(res => res.data));
	const user = useUser();

	return (
		<AppBar
			position="static"
			sx={{
				background: 'linear-gradient(121.63deg, rgba(94, 38, 253, 0.42) 2.17%, #875EFF 65.1%, rgba(83, 29, 238, 0.651031) 96.81%)',
				color: 'white',
			}}>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Typography variant="h4" sx={{ fontWeight: 700 }}>
						Oasis
					</Typography>

					<Box marginLeft={3} />

					{/* md 미만에서 보일 컨텐츠들 */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>

					{/* md 이상에서 보일 컨텐츠들 */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}>
						{navlinks?.map(navlink => (
							<MtlNavBarButton key={navlink.name} link={navlink.link}>
								{navlink.name}
							</MtlNavBarButton>
						))}
					</Box>

					{user === null ? <MtlNavBarButton link="/oauth2">로그인</MtlNavBarButton> : user.displayName}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
