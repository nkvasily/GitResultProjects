
// src/App.jsx
import { useState } from 'react'
import { Display } from './components/Display'
import { ButtonPanel } from './components/ButtonPanel'
import styles from './App.module.css'

export function App() {
	const [displayValue, setDisplayValue] = useState('0')
	const [previousValue, setPreviousValue] = useState(null)
	const [operation, setOperation] = useState(null)
	const [waitingForNewValue, setWaitingForNewValue] = useState(false)
	const [isResult, setIsResult] = useState(false) // ← ДОБАВИЛИ

	const handleButtonClick = (buttonValue) => {
		console.log('Нажата кнопка:', buttonValue)

		// Сбрасываем цвет результата при новом вводе
		if (isResult && buttonValue !== '=' && buttonValue !== 'C') {
			setIsResult(false)
		}

		// Очистка
		if (buttonValue === 'C') {
			setDisplayValue('0')
			setPreviousValue(null)
			setOperation(null)
			setWaitingForNewValue(false)
			setIsResult(false)
			return
		}

		// ОПЕРАЦИИ
		if (['/', '*', '-', '+'].includes(buttonValue)) {
			console.log('Нажата операция:', buttonValue, 'previousValue:', previousValue)
			setOperation(buttonValue)
			setPreviousValue(parseFloat(displayValue))
			setWaitingForNewValue(true)
			setIsResult(false)
			return
		}

		// Вычисление (=)
		if (buttonValue === '=') {
			console.log('Нажато равно, предыдущее значение:', previousValue, 'операция:', operation)

			if (previousValue !== null && operation) {
				const currentValue = parseFloat(displayValue)
				let result

				switch (operation) {
					case '+': result = previousValue + currentValue; break
					case '-': result = previousValue - currentValue; break
					case '*': result = previousValue * currentValue; break
					case '/': result = currentValue !== 0 ? previousValue / currentValue : 'Error'; break
					default: result = currentValue
				}

				console.log('Результат вычисления:', result)

				setDisplayValue(String(result))
				setPreviousValue(null)
				setOperation(null)
				setWaitingForNewValue(true)
				setIsResult(true)
				console.log('isResult установлен в true')
			} else {
				console.log('Не могу вычислить: previousValue или operation отсутствуют')
			}
			return
		}

		// Точка
		if (buttonValue === '.') {
			if (waitingForNewValue) {
				setDisplayValue('0.')
				setWaitingForNewValue(false)
			} else if (!displayValue.includes('.')) {
				setDisplayValue(displayValue + '.')
			}
			return
		}

		// Цифры (0-9)
		if (waitingForNewValue) {
			setDisplayValue(buttonValue)
			setWaitingForNewValue(false)
		} else {
			setDisplayValue(displayValue === '0' ? buttonValue : displayValue + buttonValue)
		}
	}

	// ВЕРСТКА
	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Калькулятор</h1>
			<div className={styles.calculator}>
				<Display value={displayValue} isResult={isResult} />
				<ButtonPanel onButtonClick={handleButtonClick} />
			</div>
		</div>
	)
}




