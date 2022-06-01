export type { ISpace };

type ISpace = {
	name: string;
	type: '건물' | '학과' | '동아리';
	thumbnail: string;
	short_introduce: string;
	long_introduce: string;
};
