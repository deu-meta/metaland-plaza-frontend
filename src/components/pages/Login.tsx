import { Box } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';

import { useUserRefresh } from '../../actions/user';
import { MtlDialog, MtlDialogContent, MtlDialogTitle } from '../basics/MtlDialog';
import { MtlOAuth2LoginButton } from '../basics/MtlOAuth2LoginButton';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlSpacer } from '../basics/MtlSpacer';

export { Login, LoginCallback };

const ACCOUNTS_API_URL = process.env.REACT_APP_ACCOUNTS_API_URL;

const Login: React.FC = () => {
	return (
		<MtlPageContents center>
			<MtlDialog>
				<MtlDialogTitle>Oasis Login</MtlDialogTitle>
				<MtlDialogContent>
					Oasis는 재학생 office 365 계정을 연동하여 로그인할 수 있습니다. Office 365 로그인 화면에서 본인의 동의대 Office 365
					계정으로 로그인해주세요.
				</MtlDialogContent>
			</MtlDialog>

			<MtlSpacer vertical={60} />

			<Box
				sx={{
					'& > *+*': {
						marginTop: 1.5,
					},
				}}>
				{(['microsoft', 'kakao'] as const).map(provider => (
					<MtlOAuth2LoginButton
						key={provider}
						provider={provider}
						href={new URL(`/jwt/${provider}/login`, ACCOUNTS_API_URL).toString()}
					/>
				))}
			</Box>
		</MtlPageContents>
	);
};

const LoginCallback: React.FC = () => {
	const { isLoading, isError, error } = useUserRefresh();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			{isLoading ? (
				<MtlDialog>
					<MtlDialogTitle>Oasis Login</MtlDialogTitle>
					<MtlDialogContent>액세스 토큰 획득중 ...</MtlDialogContent>
				</MtlDialog>
			) : isError ? (
				<MtlDialog>
					<MtlDialogTitle>Oasis Login</MtlDialogTitle>
					<MtlDialogContent>오류가 발생하였습니다. {error}</MtlDialogContent>
				</MtlDialog>
			) : (
				<Navigate replace to="/" />
			)}
		</Box>
	);
};
