import React from 'react';

import { useUser } from '../../actions/user';

export { AdminOnly };

const AdminOnly: React.FC = props => {
	const { children } = props;
	const user = useUser();

	if (user && user.role === 'admin') {
		return <>{children}</>;
	}

	return <></>;
};
