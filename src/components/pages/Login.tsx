import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { useUserRefresh } from '../../actions/user';
import { MtlDialog, MtlDialogContent, MtlDialogTitle } from '../basics/MtlDialog';
import { MtlOAuth2LoginButton } from '../basics/MtlOAuth2LoginButton';
import { MtlPageContents } from '../basics/MtlPageContents';
import { MtlSpacer } from '../basics/MtlSpacer';

export { Login, LoginCallback };

const ACCOUNTS_API_URL = process.env.REACT_APP_ACCOUNTS_API_URL;

let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const openLoginWindow = (url: string, name: string) => {
	const windowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

	if (windowObjectReference === null || windowObjectReference.closed) {
		// if the pointer to the window object in memory does not exist
		// or if such pointer exists but the window was closed
		windowObjectReference = window.open(url, name, windowFeatures);
	} else if (previousUrl !== url) {
		// if the resource to load is different,
		// then we load it in the already opened secondary window and then
		// we bring such window back on top/in front of its parent window.
		windowObjectReference = window.open(url, name, windowFeatures);
		windowObjectReference?.focus();
	} else {
		// else the window reference must exist and the window
		// is not closed; therefore, we can bring it back on top of any other
		// window with the focus() method. There would be no need to re-create
		// the window or to reload the referenced resource.
		windowObjectReference.focus();
	}
	previousUrl = url;
};

const Login: React.FC = () => {
	const onMessage = (e: MessageEvent) => {
		// Do we trust the sender of this message? (might be
		// different from what we originally opened, for example).
		if (e.origin !== window.location.origin) return;

		const data = e.data;
		console.log(data);

		if (data?.type === 'oauth2') {
			// when login success, go to main page
			if (data?.result === 'success') {
				console.log('Successfully authenticated, redirect to / ..');
				window.location.href = '/';
			}
		}
	};

	useEffect(() => {
		window.addEventListener('message', onMessage);

		return () => window.removeEventListener('message', onMessage);
	}, []);
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
						onClick={() => openLoginWindow(new URL(`/jwt/${provider}/login`, ACCOUNTS_API_URL).toString(), provider)}
					/>
				))}
			</Box>
		</MtlPageContents>
	);
};

const LoginCallback: React.FC = () => {
	const { isSuccess } = useUserRefresh();

	useEffect(() => {
		if (isSuccess) {
			if (window.opener) {
				// notify window closed
				window.opener.postMessage({
					type: 'oauth2',
					result: 'success',
				});
				// close popup
				window.close();
			}
		}
	}, [isSuccess]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			잠시만 기다려주세요 ...
		</Box>
	);
};
