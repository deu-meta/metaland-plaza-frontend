export type { IUser };

type IUser = {
	display_name: string;
	given_name: string;
	job_title: string;
	email: string;
	role: 'default' | 'student' | 'staff' | 'admin';
	provider: 'microsoft' | 'kakao';
};
