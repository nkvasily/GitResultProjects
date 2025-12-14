// src/Game.jsx
import { useState } from 'react';
import { Information } from './components/information/information';
import { Field } from './components/field/field';
import { GameLayout } from './components/game/gameLayout';

// массив с выигрышными комбинациями:
const WIN_PATTERNS = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
	[0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
	[0, 4, 8], [2, 4, 6]             // Диагональные линии
];

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(Array(9).fill(''));


	// Объявляем функцию checkWinner, которая принимает currentField - текущее состояние поля
	// checkWinner функция проверки победителя
	const checkWinner = (currentField) => {
		// Начинаем цикл for, который проходит по всем выигрышным комбинациям
		// i - индекс текущей комбинации, от 0 до 7 (всего 8 комбинаций)
		for (let i = 0; i < WIN_PATTERNS.length; i++) {

			// Деструктуризация массива: из WIN_PATTERNS[i] извлекаем 3 числа
			// Например, для WIN_PATTERNS[0] = [0, 1, 2] получим:
			// a = 0, b = 1, c = 2
			const [a, b, c] = WIN_PATTERNS[i];

			// Проверяем условия победы:
			if (currentField[a] !== '' &&                    // 1. Ячейка 'a' не пустая
				currentField[a] === currentField[b] && // 2. Ячейка 'a' равна ячейке 'b'
				currentField[a] === currentField[c]) { // 3. Ячейка 'a' равна ячейке 'c'

				return true; // Если все условия выполнены - найден победитель
			}
		}

		// Если прошли все комбинации и ни одна не подошла - победителя нет
		return false;
	};

	// Объявляем функцию checkDraw, которая принимает currentField - текущее состояние поля
	// checkDraw функция проверки ничьей:
	const checkDraw = (currentField) => {
		// 1. Проверяем, что все ячейки заполнены (нет пустых)
		const isFieldFull = currentField.every(cell => cell !== '');

		// 2. Проверяем, что нет победителя
		const hasWinner = checkWinner(currentField);

		// 3. Ничья = поле заполнено И нет победителя
		return isFieldFull && !hasWinner;
	};

	// handleCellClick - функция-обработчик клика по ячейке
	// Проверяем ход, победу, ничью,  меняем игрока
	const handleCellClick = (index) => {
		// 1. Проверяем, можно ли сделать ход
		if (isGameEnded || field[index] !== '') {
			return;
		}

		// 2. Создаем копию текущего поля
		const newField = [...field];
		newField[index] = currentPlayer;
		setField(newField);

		// 3. Проверяем победу
		if (checkWinner(newField)) {
			setIsGameEnded(true);
			console.log('Победил:', currentPlayer);
		}
		// 4. Проверяем ничью
		else if (checkDraw(newField)) {
			setIsDraw(true);
			console.log('Ничья!');
		}
		// 5. Если игра продолжается - меняем игрока
		else {
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
		}
	};

	// Сброс  на начало
	const handleRestart = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(''));
	};


	return (
		<GameLayout
			information={<Information currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw} />}
			field={<Field field={field} currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw} onCellClick={handleCellClick} />}
			onRestart={handleRestart}
		/>
	);
};
