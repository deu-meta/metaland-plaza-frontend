import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { blue, grey, purple } from '@mui/material/colors';
import React from 'react';

import { IUser } from '../../models/user';

export type { MtlRoleChipProps };
export { MtlRoleChip };

function getDisplayRole(role: IUser['role']) {
	switch (role) {
		case 'default':
			return '외부인';
		case 'student':
			return '재학생';
		case 'staff':
			return '스태프';
		case 'admin':
			return '어드민';
	}
}

function getRoleColor(role: IUser['role']) {
	switch (role) {
		case 'default':
			return grey[700];
		case 'student':
			return blue[700];
		case 'staff':
			return purple[700];
		case 'admin':
			return purple[900];
	}
}

type MtlRoleChipProps = {
	role: IUser['role'];
} & ChipProps;

const MtlRoleChip: React.FC<MtlRoleChipProps> = props => {
	const { role, sx, ...chipProps } = props;

	return (
		<Chip
			label={getDisplayRole(role)}
			size="small"
			sx={{ backgroundColor: getRoleColor(role), color: 'white', ...sx }}
			{...chipProps}
		/>
	);
};
