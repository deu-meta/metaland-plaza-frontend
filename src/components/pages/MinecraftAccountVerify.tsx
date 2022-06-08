import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Navigate, useParams } from 'react-router';

import { useMinecraftAccountVerify, useMinecraftAccountVerifyRead } from '../../actions/minecraftAccount';
import { useUser } from '../../actions/user';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlPageTitle } from '../basics/MtlPageTitle';
import { MtlSpacer } from '../basics/MtlSpacer';

export { MinecraftAccountVerify };

const MinecraftAccountVerify: React.FC = () => {
	const user = useUser();
	const { code } = useParams();
	const { data: minecraftAccount, isError } = useMinecraftAccountVerifyRead(code);
	const minecraftAccountVerify = useMinecraftAccountVerify();

	if (user === null) return <Navigate to={`/login?reason=minecraft-account&code=${code}`} />;

	return (
		<MtlPageContents>
			<MtlPageTitle>마인크래프트 계정 연동</MtlPageTitle>

			{minecraftAccountVerify.isSuccess ? (
				<>성공적으로 연동하였습니다! 창을 닫고 서버에 재접속해주세요.</>
			) : code === undefined ? (
				<>연동을 위한 code가 존재하지 않습니다.</>
			) : isError ? (
				<>해당 code는 만료되었거나 존재하지 않습니다.</>
			) : minecraftAccount === undefined ? (
				<>로딩중입니다...</>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Typography>
						{minecraftAccount.display_name} 계정을 연결하려고 합니다. 본인의 계정이 맞다면 아래 확인 버튼을 눌러주세요.
					</Typography>

					<MtlSpacer vertical={20} />

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}>
						<Button variant="contained" onClick={() => minecraftAccountVerify.mutate(code)}>
							확인
						</Button>
					</Box>
				</Box>
			)}
		</MtlPageContents>
	);
};
