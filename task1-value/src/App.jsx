// src\App.jsx
import { useState } from 'react';
import styles from './App.module.css'

export function App() {
	// const [count, setCount] = useState;
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	const [list, setList] = useState([]);

	const isValueValid = value.length >= 3;

	// 	ЛОГИКА
	const onInputButtonClick = () => {
		let promptValue = prompt('Введите новое значение:', '');
		// console.log('Введенное знаяение', promptValue);
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setError('');
			setValue(promptValue);
		};
	}

	// const Wellcome = (props) => { props.name }

	const onAddButtonClick = () => {
		if (isValueValid) {
			let updatedList = [...list, { id: Date.now(), value: value }];
			setList(updatedList);
			setValue('');
			setError('');

		}
	}

	// ВЕРСТКА
	return (

		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: <output className={styles.currentValue} >{value}</output>
				{/* Текущее значение <code>value</code>: <span className={styles.currentValue}>{value}</span> */}
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
				<button className={styles.button} disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 && <p className={styles.noMarginText}>Нет добавленных элементов</p>}
				{list.length > 0 && (<ul className={styles.list}>
					{/* <li className={styles.listItem}>Первый элемент</li> */}
					{list.map(item => <li className={styles.listItem} key={item.id}>{item.value}</li>)}
				</ul>
				)}
			</div>
		</div>

	)
}




