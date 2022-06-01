import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from 'react-router';

import { useUser, useUserLogout } from '../../actions/user';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlRoleChip } from '../basics/MtlRoleChip';
import { MtlSpacer } from '../basics/MtlSpacer';

export { Profile };

const Profile: React.FC = () => {
	const user = useUser();
	const userLogout = useUserLogout();
	const navigate = useNavigate();

	if (user === null) {
		return <Navigate to="/login" />;
	}

	return (
		<MtlPageContents>
			<MtlPageTitle>사용자 정보</MtlPageTitle>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					'& > *': {
						marginRight: 2,
					},
				}}>
				<Avatar sx={{ width: 56, height: 56 }} />
				<Box>
					<Box>
						<Typography variant="h6" display="inline">
							{user.display_name}
						</Typography>
						<MtlSpacer horizontal={8} />
						<Typography variant="subtitle2" color="textSecondary" display="inline">
							{user.given_name}
						</Typography>
						<MtlSpacer horizontal={8} />
						<MtlRoleChip role={user.role} />
					</Box>
					<Box>
						<Typography variant="subtitle2" display="inline">
							{user.email} ({user.provider})
						</Typography>
					</Box>
				</Box>

				<Button
					variant="contained"
					color="primary"
					sx={{
						marginLeft: 'auto',
					}}
					onClick={() => {
						userLogout.refetch().then(() => navigate('/'));
					}}>
					로그아웃
				</Button>
			</Box>
		</MtlPageContents>
	);
};
