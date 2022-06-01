import axios from 'axios';
import { QueryClient } from 'react-query';

export { queryClient, accountsApiClient, setAccessToken, plazaApiClient };

const ACCOUNTS_API_URL = process.env.REACT_APP_ACCOUNTS_API_URL || 'http://localhost:8000';
const PLAZA_API_URL = process.env.REACT_APP_PLAZA_API_URL || 'http://localhost:8001';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchInterval: false,
			refetchOnWindowFocus: false,
		},
	},
});

const accountsApiClient = axios.create({
	baseURL: ACCOUNTS_API_URL,
	withCredentials: true,
});

function setAccessToken(accessToken: string | null) {
	if (!accessToken) {
		delete accountsApiClient.defaults.headers.common['Authorization'];
	} else {
		accountsApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	}
}

accountsApiClient.interceptors.response.use(
	response => response,
	async error => {
		if (error.response && error.response.status === 401) {
			const originalRequest = error.config;
			if (originalRequest.url === '/jwt/refresh') {
				return Promise.reject(error);
			}

			try {
				const { data } = await accountsApiClient.post<{ access_token: string }>('/jwt/refresh');
				const { access_token: accessToken } = data;

				setAccessToken(accessToken);

				return await accountsApiClient.request(originalRequest);
			} catch (error) {
				setAccessToken(null);
				console.log(error);
			}
			return Promise.reject(error);
		}
		return Promise.reject(error);
	},
);

const plazaApiClient = axios.create({
	baseURL: PLAZA_API_URL,
});
