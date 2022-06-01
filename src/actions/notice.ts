import { useMutation, useQuery } from 'react-query';

import { INotice } from '../models/notice';
import { IPaginated } from '../models/pagination';
import { plazaApiClient } from '../services/api';

export { useNotices, useNoticeAdd, useNoticeDelete };

function useNotices(page: number) {
	return useQuery<IPaginated<INotice[]>>('notices', () =>
		plazaApiClient.get<IPaginated<INotice[]>>(`/notices/?page=${page}`).then(response => {
			response.data.results.forEach(notice => (notice.created_at = new Date(notice.created_at)));

			return response.data;
		}),
	);
}

function useNoticeAdd(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, Omit<INotice, 'id' | 'created_at'>>(
		newNotice => plazaApiClient.post('/notices/', newNotice).then(response => response.data),
		options,
	);
}

function useNoticeDelete(options?: Parameters<typeof useMutation>[2]) {
	return useMutation<unknown, unknown, number>(
		noticeId => plazaApiClient.delete(`/notices/${noticeId}/`).then(response => response.data),
		options,
	);
}
