// src/components/game/gameLayout.jsx
import styles from './game.module.css';

export const GameLayout = ({ information, field, onRestart }) => {
	return (
		<div className={styles.game}>
			<h1>Крестики-Нолики</h1>
			{information}
			{field}
			<button className={styles.restartButton} onClick={onRestart}>
				Начать заново
			</button>
		</div>
	);
};
