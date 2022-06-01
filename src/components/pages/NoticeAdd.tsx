import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useNoticeAdd } from '../../actions/notice';
import { MtlNotion } from '../basics/MtlNotion';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlSpacer } from '../basics/MtlSpacer';

export { NoticeAdd };

function extractNotionPageId(url: string): string | null {
	const base = url.split('/').pop();
	if (base === undefined) return null;

	const match = base.match(/[0-9a-f]{32}/);
	if (match === null) return null;

	return match.pop() ?? null;
}

const NoticeAdd: React.FC = () => {
	const [title, setTitle] = useState('');
	const [notionPageId, setNotionPageId] = useState<string | null>(null);
	const navigate = useNavigate();
	const noticeAdd = useNoticeAdd({
		onSuccess: () => navigate('/notices'),
	});

	const formDisabled = noticeAdd.isLoading;

	return (
		<MtlPageContents>
			<MtlPageTitle>공지사항 추가</MtlPageTitle>

			<TextField
				label="공지사항 제목"
				helperText="공지사항 목록에서 표시될 제목을 입력해주세요."
				margin="normal"
				value={title}
				disabled={formDisabled}
				onChange={e => setTitle(e.target.value)}
			/>
			<TextField
				label="노션 페이지 URL"
				helperText="표시할 노션 페이지의 URL을 입력해주세요."
				margin="normal"
				disabled={formDisabled}
				onBlur={e => {
					const notionPageId = extractNotionPageId(e.target.value);
					setNotionPageId(notionPageId);
				}}
			/>

			<MtlSpacer vertical={20} />
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					variant="contained"
					disabled={!(title && notionPageId) || formDisabled}
					onClick={() =>
						noticeAdd.mutate({
							title: title,
							notion: notionPageId as string,
						})
					}>
					추가
				</Button>
			</Box>

			<MtlSpacer vertical={40} />

			<Typography variant="h4">노션 페이지 미리보기</Typography>
			<MtlSpacer vertical={10} />
			<Typography variant="subtitle1" color="textSecondary">
				노션 페이지를 미리 렌더링하여 표시합니다. 일부 표시되지 않는 컨텐츠가 있을 수 있습니다.
			</Typography>
			<MtlSpacer vertical={10} />
			{notionPageId ? (
				<MtlNotion pageId={notionPageId} />
			) : (
				<Typography variant="subtitle1">노션 페이지 URL을 입력해주세요.</Typography>
			)}
		</MtlPageContents>
	);
};
