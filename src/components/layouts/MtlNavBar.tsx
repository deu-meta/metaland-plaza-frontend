import { Construction, Menu as MenuIcon } from '@mui/icons-material';
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	MenuItem,
	Toolbar,
	Typography,
	Menu,
} from '@mui/material';
import type { ButtonProps } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useNavlinks } from '../../actions/navbar';
import { useUser } from '../../actions/user';
import { MtlSpacer } from '../basics/MtlSpacer';
import { StaffOnly } from '../roles/staff';

export { MtlNavBar };

const drawerWidth = 240;

const staffMenuItems = [
	{ name: '네비게이션 바 편집', link: '/navbar' },
	{ name: '사용자 목록', link: '/users' },
];

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
	const { homeNavlink, navlinks } = useNavlinks();
	const user = useUser();
	const navigate = useNavigate();

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [staffMenuAnchorEl, setStaffMenuAnchorEl] = React.useState<null | HTMLElement>(null);
	const [staffMenuOpen, setStaffMenuOpen] = useState(false);

	return (
		<AppBar
			position="static"
			sx={{
				background: 'linear-gradient(121.63deg, rgba(94, 38, 253, 0.42) 2.17%, #875EFF 65.1%, rgba(83, 29, 238, 0.651031) 96.81%)',
				color: 'white',
			}}>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2, display: { md: 'none' } }}>
						<MenuIcon />
					</IconButton>

					<Link to={homeNavlink.link} style={{ textDecoration: 'none', color: 'unset' }}>
						<Typography variant="h4" sx={{ fontWeight: 700 }}>
							{homeNavlink.name}
						</Typography>
					</Link>

					<MtlSpacer horizontal={24} />

					{/* 데스크탑에서 보일 컨텐츠들 */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}>
						{navlinks?.map(({ name, link }) => (
							<MtlNavBarButton key={name} link={link}>
								{name}
							</MtlNavBarButton>
						))}
					</Box>

					<Box marginLeft="auto" />

					<StaffOnly>
						<IconButton
							color="inherit"
							edge="end"
							onClick={e => {
								setStaffMenuOpen(true);
								setStaffMenuAnchorEl(e.currentTarget);
							}}>
							<Construction />
						</IconButton>

						<Menu
							open={staffMenuOpen}
							anchorEl={staffMenuAnchorEl}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							onClose={() => setStaffMenuOpen(false)}>
							{staffMenuItems.map(({ name, link }) => (
								<MenuItem
									key={name}
									onClick={() => {
										navigate(link);
										setStaffMenuOpen(false);
									}}>
									{name}
								</MenuItem>
							))}
						</Menu>

						<MtlSpacer horizontal={16} />
					</StaffOnly>

					{user === null ? (
						<MtlNavBarButton link="/oauth2">로그인</MtlNavBarButton>
					) : (
						<MtlNavBarButton link="/profile">{user.display_name}</MtlNavBarButton>
					)}
				</Toolbar>
			</Container>

			{/* 모바일 화면에서만 표시될 drawer */}
			<Drawer
				container={window!.document.body}
				variant="temporary"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', md: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}>
				<List>
					<ListItemButton
						onClick={() => {
							navigate(homeNavlink.link);
							setDrawerOpen(false);
						}}>
						<ListItemText primary={homeNavlink.name} primaryTypographyProps={{ variant: 'h4', sx: { fontWeight: 700 } }} />
					</ListItemButton>
				</List>
				<Divider />
				<List>
					{navlinks?.map(({ name, link }) => (
						<ListItemButton key={name}>
							<ListItemText
								primary={name}
								onClick={() => {
									navigate(link);
									setDrawerOpen(false);
								}}
							/>
						</ListItemButton>
					))}
				</List>
			</Drawer>
		</AppBar>
	);
};
