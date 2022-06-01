import React from 'react';
import { useParams } from 'react-router';

import { MtlNotion } from '../basics/MtlNotion';

export { Notion };

const Notion: React.FC = () => {
	const { pageId } = useParams();

	if (pageId === undefined) return <>에러</>;

	return <MtlNotion pageId={pageId} />;
};
