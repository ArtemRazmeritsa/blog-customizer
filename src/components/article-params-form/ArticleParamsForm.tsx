import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator/Separator';
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleFormProps = {
	onChange: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleFormProps> = ({ onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleApply = () => {
		onChange({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
		});
	};
	const handleReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleApply();
	};

	const toggleIsOpen = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleFontChange = (selected: OptionType) => {
		setSelectedFont(selected);
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setSelectedFontSize(selected);
	};

	const handleFontColorChange = (selected: OptionType) => {
		setSelectedFontColor(selected);
	};

	const handleBgColorChange = (selected: OptionType) => {
		setSelectedBgColor(selected);
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setSelectedContentWidth(selected);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						title={'Шрифт'}
						onChange={handleFontChange}></Select>
					<RadioGroup
						options={fontSizeOptions}
						selected={selectedFontSize}
						name={'fontSize'}
						title={'Размер шрифта'}
						onChange={handleFontSizeChange}></RadioGroup>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						title={'Цвет шрифта'}
						onChange={handleFontColorChange}></Select>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBgColor}
						title={'Цвет фона'}
						onChange={handleBgColorChange}></Select>
					<Select
						options={contentWidthArr}
						selected={selectedContentWidth}
						title={'Ширина контента'}
						onChange={handleContentWidthChange}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
