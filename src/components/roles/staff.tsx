import React from 'react';

import { useUser } from '../../actions/user';

export { StaffOnly };

const StaffOnly: React.FC = props => {
	const { children } = props;
	const user = useUser();

	if (user && (user.role === 'staff' || user.role === 'admin')) {
		return <>{children}</>;
	}

	return <></>;
};
