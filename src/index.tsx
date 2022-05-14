import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { UserProvider } from './context/user';
import { queryClient } from './services/api';

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</UserProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
