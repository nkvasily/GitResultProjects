// src/components/Display.jsx
import styles from './Display.module.css'

export const Display = ({ value, isResult = false }) => {
	console.log('Display props:', { value, isResult }) // дебажим
	return (
		<div className={styles.display}>
			<input
				type='text'
				value={value}
				readOnly
				className={`${styles.input} ${isResult ? styles.result : ''}`}
				id="calculator-display"
			/>
		</div>
	)
}
