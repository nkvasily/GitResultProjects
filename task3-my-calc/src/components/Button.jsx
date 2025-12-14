// src/components/Button.module.jsx
// import './Button.css'
import styles from './Button.module.css'

export const Button = ({ label, onClick, type = 'default' }) => {
	// console.log(styles)
	return (
		<button
			// className={`button button-${type}`} // это без modules.css
			className={`${styles.button} ${styles[`button-${type}`]}`}
			onClick={() => onClick(label)}
		>

			{label}
		</button>
	)
}


