// src\App.jsx
import { useState } from 'react';
import data from './data.json';
import styles from './App.module.css'

export const App = () => {
	// const [count, setCount] = useState;

	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	function handleBack() {
		if (!isFirstStep) {
			setActiveIndex(activeIndex - 1);
		}
	}

	function handleForward() {
		if (isLastStep) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
	}

	function handleStepClick(index) {
		setActiveIndex(index);
	}


	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						<h3>{steps[activeIndex].title}</h3>
						<p>{steps[activeIndex].content}</p>
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							const isActive = index === activeIndex;
							const isDone = index <= activeIndex;

							const itemClass = `
           						${styles['steps-item']}
           						${isActive ? styles.active : ''}
           						${isDone ? styles.done : ''}
        					`.trim();

							return (
								<li key={step.id} className={itemClass}>
									<button
										className={styles['steps-item-button']}
										onClick={() => handleStepClick(index)}
									>
										{index + 1}
									</button>
									Шаг {index + 1}
								</li>
							);
						})}
					</ul>

					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={handleBack}>Назад</button>
						<button className={styles.button} onClick={handleForward}>
							{/* Далее */}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};



