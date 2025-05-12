import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateOptions, setStateOptions] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateOptions.fontFamilyOption.value,
					'--font-size': stateOptions.fontSizeOption.value,
					'--font-color': stateOptions.fontColor.value,
					'--container-width': stateOptions.contentWidth.value,
					'--bg-color': stateOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateOptions={stateOptions}
				confirm={(e: ArticleStateType) => {
					setStateOptions(e);
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
