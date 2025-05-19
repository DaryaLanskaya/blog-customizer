import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleFormProps {
	stateOptions: ArticleStateType;
	confirm: (data: ArticleStateType) => void;
	onClose?: () => void;
}

export const ArticleParamsForm = ({
	stateOptions,
	confirm,
	onClose,
}: ArticleFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectedState, setSelectedState] =
		useState<ArticleStateType>(stateOptions);
	const handleChangeSelectedState = (key: string, value: OptionType) => {
		setSelectedState({ ...selectedState, [key]: value });
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		confirm(selectedState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose,
		onChange: setIsMenuOpen,
	});

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setSelectedState(defaultArticleState);
		confirm(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedState.fontFamilyOption}
						onChange={(e: OptionType) => {
							handleChangeSelectedState('fontFamilyOption', e);
						}}></Select>
					<RadioGroup
						name='size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						onChange={(e: OptionType) => {
							handleChangeSelectedState('fontSizeOption', e);
						}}></RadioGroup>
					<Select
						options={fontColors}
						selected={selectedState.fontColor}
						onChange={(e: OptionType) => {
							handleChangeSelectedState('fontColor', e);
						}}></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={selectedState.backgroundColor}
						onChange={(e: OptionType) => {
							handleChangeSelectedState('backgroundColor', e);
						}}></Select>
					<Select
						options={contentWidthArr}
						selected={selectedState.contentWidth}
						onChange={(e: OptionType) => {
							handleChangeSelectedState('contentWidth', e);
						}}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
