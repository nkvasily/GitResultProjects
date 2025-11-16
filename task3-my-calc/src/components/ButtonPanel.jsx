// src/components/ButtonPanel.jsx
import styles from './ButtonPanel.module.css' //
import { Button } from './Button'

export function ButtonPanel({ onButtonClick }) {
	const buttons = [
		['7', '8', '9', '/'],
		['4', '5', '6', '*'],
		['1', '2', '3', '-'],
		['0', '.', '=', '+'],
		['C']
	]

	return (
		<div className={styles.panel}>
			{buttons.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.row}>
					{row.map(button => (
						<Button
							key={button}
							label={button}
							onClick={onButtonClick}
							type={['/', '*', '-', '+', '='].includes(button) ? 'operator' : 'default'}
						/>
					))}
				</div>
			))}
		</div>
	)
}


