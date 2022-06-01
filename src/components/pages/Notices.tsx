import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Pagination, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNoticeDelete, useNotices } from '../../actions/notice';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlSpacer } from '../basics/MtlSpacer';
import { StaffOnly } from '../roles/staff';

export { Notices };

const Notices: React.FC = () => {
	const [page, setPage] = useState(1);
	const { data, refetch } = useNotices(page);

	const [manage, setManage] = useState(false);
	const noticeDelete = useNoticeDelete({
		onSuccess: () => {
			refetch();
		},
	});

	return (
		<MtlPageContents>
			<MtlPageTitle>📢 공지사항</MtlPageTitle>

			<Paper>
				<List
					sx={{
						width: '100%',
					}}>
					{data?.results.map(notice =>
						!manage ? (
							<Link key={notice.id} to={`/notices/${notice.notion}`} style={{ textDecoration: 'none', color: 'initial' }}>
								<ListItemButton>
									<ListItemText primary={notice.title} />
								</ListItemButton>
							</Link>
						) : (
							<ListItem
								key={notice.id}
								secondaryAction={
									<IconButton
										edge="end"
										onClick={() => {
											if (confirm(`정말로 "${notice.title}" 공지를 삭제하시겠습니까?`)) {
												noticeDelete.mutate(notice.id);
											}
										}}>
										<Delete />
									</IconButton>
								}>
								<ListItemText primary={notice.title} />
							</ListItem>
						),
					)}
				</List>
			</Paper>

			<StaffOnly>
				<MtlSpacer vertical={30} />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 1,
					}}>
					<Button variant="contained" color={!manage ? 'primary' : 'secondary'} onClick={() => setManage(!manage)}>
						{!manage ? '편집' : '완료'}
					</Button>
					<Button component={Link} to="add" variant="contained">
						추가
					</Button>
				</Box>
			</StaffOnly>

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
		</MtlPageContents>
	);
};
