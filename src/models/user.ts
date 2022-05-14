export type { IProvider, IUser };

type IProvider = 'office365' | 'google' | 'naver';

type IUser = {
	displayName: string;
	givenName: string;
	jobTitle: string;
	mail: string;
	role: string;
};
