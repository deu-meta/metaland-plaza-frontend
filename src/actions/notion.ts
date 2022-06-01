import type { ExtendedRecordMap } from 'notion-types';
import { useQuery } from 'react-query';

import { notionApiClient } from '../services/api';

export { useNotionPage };

function useNotionPage(pageId: string) {
	return useQuery<ExtendedRecordMap>(['notion', pageId], () => notionApiClient.get(`/page/${pageId}`).then(response => response.data));
}
