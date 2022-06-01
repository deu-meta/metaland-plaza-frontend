export type { IPaginated };

type IPaginated<Results> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Results;
	total_pages: number;
};
