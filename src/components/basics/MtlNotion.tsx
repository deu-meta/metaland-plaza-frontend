import React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { useNavigate } from 'react-router';

import { useNotionPage } from '../../actions/notion';

export { MtlNotion };
export type { MtlNotionProps };

type MtlNotionProps = {
	pageId: string;
} & Omit<React.ComponentProps<typeof NotionRenderer>, 'recordMap'>;

const MtlNotion: React.FC<MtlNotionProps> = props => {
	const { children, pageId, ...notionRendererProps } = props;
	const { data, isLoading, isError, error } = useNotionPage(pageId);
	const navigate = useNavigate();

	if (isLoading) {
		return <>로딩중 ...</>;
	}

	if (isError) {
		return <>오류가 발생하였습니다 ...</>;
	}

	// This prevents page refresh.
	// We appreciate if we can use navigate hook (of react-router) instead of moving href.
	const handleAnchorClick: React.MouseEventHandler<HTMLDivElement> = event => {
		if (event.target instanceof HTMLElement) {
			let element = event.target;
			while (!(element instanceof HTMLAnchorElement)) {
				if (element.classList.contains('notion-app') || element.parentElement === null) break;

				element = element.parentElement;
			}

			const href = element.getAttribute('href');

			if (href === null) return;

			if (!href.startsWith('http://') && !href.startsWith('https://')) {
				event.preventDefault();
				navigate(href);
			}
		}
	};

	if (data !== undefined) {
		return (
			// stop anchor tag click event,
			// instead we can use navigate hook.
			<div onClick={handleAnchorClick}>
				<NotionRenderer
					recordMap={data}
					fullPage
					mapPageUrl={pageId => `/notices/${pageId}`}
					components={{
						Code,
						Collection,
						Equation,
						Modal,
					}}
					{...notionRendererProps}
				/>
			</div>
		);
	}

	return <>{error}</>;
};
