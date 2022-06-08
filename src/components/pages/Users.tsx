import { Edit } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Pagination,
	Paper,
} from '@mui/material';
import React, { useState } from 'react';

import { useUsers, useUserEdit } from '../../actions/user';
import { IUser } from '../../models/user';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlRoleChip } from '../basics/MtlRoleChip';
import { MtlSpacer } from '../basics/MtlSpacer';

export { Users };

const Users: React.FC = () => {
	const [page, setPage] = useState(1);
	const { data, refetch } = useUsers(page);
	const userEdit = useUserEdit({
		onSuccess: () => {
			refetch();
		},
	});
	const [focusedUser, setFocusedUser] = useState<IUser | null>(null);

	return (
		<MtlPageContents>
			<MtlPageTitle>🔎 사용자 목록</MtlPageTitle>

			<Paper>
				<List>
					{data?.results.map(user => (
						<ListItem
							key={user.email}
							secondaryAction={
								<IconButton edge="end" onClick={() => setFocusedUser(user)}>
									<Edit />
								</IconButton>
							}>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText
								primary={
									<>
										{user.display_name} ({user.given_name}) <MtlRoleChip role={user.role} />
									</>
								}
								secondary={`${user.email} (${user.provider})`}
							/>
						</ListItem>
					))}
				</List>
			</Paper>

			<MtlSpacer vertical={30} />

			{data && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Pagination count={data.total_pages} color="primary" page={page} onChange={(e, newPage) => setPage(newPage)} />
				</Box>
			)}

			<Dialog onClose={() => setFocusedUser(null)} open={!!focusedUser}>
				{focusedUser !== null && (
					<>
						<DialogTitle>
							{focusedUser.display_name} ({focusedUser.email}) 유저의 역할을 선택하세요.
						</DialogTitle>

						<DialogContent>
							<Box
								sx={{
									display: 'flex',
									gap: 1,
								}}>
								{(['default', 'student', 'staff', 'admin'] as Array<IUser['role']>).map(role => (
									<MtlRoleChip
										key={role}
										role={role}
										disabled={role === focusedUser.role}
										onClick={() => {
											userEdit.mutate({
												id: focusedUser.id,
												role: role,
											});
											setFocusedUser(null);
										}}
									/>
								))}
							</Box>
						</DialogContent>
					</>
				)}
			</Dialog>
		</MtlPageContents>
	);
};
