// src/components/information/informationLayout.jsx
import styles from './information.module.css';
import PropTypes from 'prop-types';


export const InformationLayout = ({ status }) => {
	return (
		<div className={styles.information}>
			<h2>{status}</h2>
		</div>
	);
};

InformationLayout.propTypes = {
	status: PropTypes.string.isRequired,
};

