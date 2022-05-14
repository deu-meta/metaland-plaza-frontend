import { Box, Button } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';

import { useUserRefresh } from '../../context/user';
import { MtlDialog, MtlDialogContent, MtlDialogTitle } from '../basics/MtlDialog';
export { OAuth2Index, OAuth2Callback };

const ACCOUNTS_API_URL = process.env.REACT_APP_ACCOUNTS_API_URL;

const OAuth2Index: React.FC = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<MtlDialog>
				<MtlDialogTitle>Oasis Login</MtlDialogTitle>
				<MtlDialogContent>
					Oasis는 재학생 office 365 계정을 연동하여 로그인할 수 있습니다. Office 365 로그인 화면에서 본인의 동의대 Office 365
					계정으로 로그인해주세요.
				</MtlDialogContent>
			</MtlDialog>
			<Box marginTop={6}></Box>

			<Button
				variant="contained"
				size="large"
				onClick={() => (window.location.href = new URL('/jwt/microsoft/login', ACCOUNTS_API_URL).toString())}>
				Microsoft로 로그인하기
			</Button>
		</Box>
	);
};

const OAuth2Callback: React.FC = () => {
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
