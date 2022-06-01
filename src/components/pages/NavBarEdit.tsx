import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useNavlinks, useNavLinksUpdate } from '../../actions/navbar';
import { INavLink } from '../../models/navlink';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlSpacer } from '../basics/MtlSpacer';

export { NavBarEdit };

function swap<T>(array: T[], a: number, b: number) {
	[array[a], array[b]] = [array[b], array[a]];
	return array;
}

const NavBarEdit: React.FC = () => {
	const { data, refetch } = useNavlinks();
	const [navlinks, setNavlinks] = useState<INavLink[] | null>(null);
	const [newNavlink, setNewNavlink] = useState<INavLink>({ name: '', link: '' });
	const navlinksUpdate = useNavLinksUpdate({
		onSuccess: () => {
			refetch();
		},
	});

	const save = async () => {
		if (navlinks === null) return;

		navlinksUpdate.mutate(navlinks);
		refetch();
	};

	useEffect(() => {
		if (data !== undefined) setNavlinks([...data]);
	}, [data]);

	return (
		<MtlPageContents>
			<MtlPageTitle>🛠 네비게이션 바 편집</MtlPageTitle>

			{navlinks === null ? (
				<>로딩중 ...</>
			) : (
				<>
					<Paper>
						<List>
							{navlinks.map((navlink, index) => (
								<ListItem
									key={index}
									secondaryAction={
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 2,
											}}>
											<IconButton
												edge="end"
												onClick={() => {
													console.log(navlinks.filter(_navlink => _navlink.name !== navlink.name));
													setNavlinks([...navlinks.filter(_navlink => _navlink.name !== navlink.name)]);
												}}>
												<Delete />
											</IconButton>
											<IconButton
												edge="end"
												sx={{
													visibility: index !== 0 ? undefined : 'hidden',
												}}
												onClick={() => {
													setNavlinks(swap([...navlinks], index, index - 1));
												}}>
												<ArrowUpward />
											</IconButton>
											<IconButton
												edge="end"
												sx={{
													visibility: navlinks[index + 1] !== undefined ? undefined : 'hidden',
												}}
												onClick={() => {
													setNavlinks(swap([...navlinks], index, index + 1));
												}}>
												<ArrowDownward />
											</IconButton>
										</Box>
									}>
									<ListItemText primary={navlink.name} secondary={navlink.link} />
								</ListItem>
							))}
						</List>
					</Paper>

					<MtlSpacer vertical={20} />

					<Typography variant="body1" color="textSecondary">
						TIP: 가장 상단에 배치된 링크는 네비게이션 바에서 가장 왼쪽에 크게 표시됩니다.
					</Typography>

					<MtlSpacer vertical={40} />

					<Typography variant="h4">항목 추가하기</Typography>
					<MtlSpacer vertical={20} />

					<Box>
						<TextField
							label="표시할 이름"
							helperText="네비게이션 바에 표시될 이름을 입력해주세요. (예: 공지)"
							value={newNavlink.name}
							onChange={e => setNewNavlink({ name: e.target.value, link: newNavlink.link })}
						/>
						<MtlSpacer horizontal={16} />
						<TextField
							label="링크"
							helperText="링크는 /로 시작하는 경로를 입력해주세요. (예: /notices)"
							value={newNavlink.link}
							onChange={e => setNewNavlink({ name: newNavlink.name, link: e.target.value })}
						/>
					</Box>

					<MtlSpacer vertical={40} />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}>
						<Button
							variant="contained"
							disabled={!(newNavlink.name && newNavlink.link.startsWith('/'))}
							onClick={() => {
								setNavlinks([...navlinks, newNavlink]);
								setNewNavlink({
									name: '',
									link: '',
								});
							}}>
							추가
						</Button>
						<MtlSpacer horizontal={16} />
						<Button variant="contained" onClick={save}>
							저장
						</Button>
					</Box>
				</>
			)}
		</MtlPageContents>
	);
};
