// src/components/field/field.jsx
import { FieldLayout } from './fieldLayout';
import PropTypes from 'prop-types';

export const Field = ({ field, isGameEnded, isDraw, onCellClick }) => {
	return <FieldLayout
		field={field}
		onCellClick={onCellClick}
		isGameEnded={isGameEnded}
		isDraw={isDraw}

	/>;
};

Field.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	currentPlayer: PropTypes.string.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	isDraw: PropTypes.bool.isRequired,
	onCellClick: PropTypes.func.isRequired,
};
