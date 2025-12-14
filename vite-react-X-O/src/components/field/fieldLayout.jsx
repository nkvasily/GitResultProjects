// src/components/field/fieldLayout.jsx
import styles from './field.module.css';
import PropTypes from 'prop-types';

export const FieldLayout = ({ field, onCellClick, isGameEnded, isDraw }) => {
	return (
		<div className={styles.field}>
			{field.map((cell, index) => (
				<button
					key={index}
					className={styles.cell}
					onClick={() => onCellClick(index)}
					disabled={isGameEnded || isDraw || cell !== ''}
				>
					{cell}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	onCellClick: PropTypes.func.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	isDraw: PropTypes.bool.isRequired,
};
