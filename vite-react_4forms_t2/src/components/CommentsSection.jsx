// 1. Импортируем необходимые хуки из React
import { useActionState, useOptimistic, useState } from 'react';

// 2. Начальные комментарии (обычно приходят с сервера)
const initialComments = [
	{ id: 1, name: 'Алексей', text: 'Отличная статья!' },
	{ id: 2, name: 'Мария', text: 'Спасибо за подробное объяснение.' },
];

// 3. Асинхронная функция-действие (action) - имитация отправки на сервер
// Принимает: предыдущее состояние и данные формы (FormData)
// Возвращает: объект с результатом (ошибкой или успехом)
async function addCommentAction(prevState, formData) {
	// Имитируем задержку сети - 1.5 секунды
	await new Promise((resolve) => setTimeout(resolve, 1500));

	// Случайным образом имитируем ошибку (в 30% случаев)
	// Это нужно для демонстрации отката оптимистичного обновления
	const shouldFail = Math.random() < 0.3;
	if (shouldFail) {
		return {
			error: 'Ошибка сети! Не удалось отправить комментарий. Попробуйте еще раз.',
			success: false
		};
	}

	// Получаем данные из FormData
	const name = formData.get('name');
	const text = formData.get('message');

	// В реальном приложении здесь был бы fetch/axios запрос на сервер
	// Сервер бы вернул новый комментарий с настоящим id, датой и т.д.
	const newComment = {
		id: Date.now(), // Временный id, в реальности приходит с сервера
		name,
		text,
	};

	// Возвращаем успешный результат
	return {
		newComment,
		error: null,
		success: true
	};
}

// 4. Основной компонент секции комментариев
export default function CommentsSection() {
	// 5. Реальное состояние комментариев (то, что точно есть на сервере)
	const [comments, setComments] = useState(initialComments);

	// 6. Оптимистичное обновление комментариев
	// useOptimistic возвращает:
	// - optimisticComments: данные для отображения (мгновенно обновляются)
	// - addOptimisticComment: функция для триггера оптимистичного обновления
	const [optimisticComments, addOptimisticComment] = useOptimistic(
		comments, // Базовое состояние (реальные комментарии)

		// Функция-редьюсер: описывает, КАК обновить оптимистичное состояние
		// currentComments - текущие оптимистичные комментарии
		// newComment - то, что передали в addOptimisticComment
		(currentComments, newComment) => [
			...currentComments, // Копируем старые комментарии
			{
				...newComment,
				isOptimistic: true, // Помечаем как оптимистичный (для стилей)
				// Временный id для ключа, т.к. у оптимистичного комментария еще нет реального id
				id: 'temp-' + Date.now() + Math.random()
			}
		]
	);

	// 7. Управление состоянием асинхронного действия (формы)
	// useActionState возвращает:
	// - state: результат последнего выполнения action (ошибка/успех)
	// - formAction: функция для вызова action (привязывается к форме)
	// - isPending: флаг загрузки (true когда action выполняется)
	const [state, formAction, isPending] = useActionState(
		// Передаем нашу функцию-действие
		async (prevState, formData) => {
			// ВЫЗОВ ОПТИМИСТИЧНОГО ОБНОВЛЕНИЯ ПРОИСХОДИТ В ОБЁРТКЕ НИЖЕ
			// Здесь только реальная логика (имитация запроса + обработка ошибок)

			// Вызываем оригинальную функцию-действие
			const result = await addCommentAction(prevState, formData);

			// Если запрос успешен - обновляем реальное состояние
			if (result.success && result.newComment) {
				setComments((prev) => [...prev, result.newComment]);
			}

			// Возвращаем результат для отображения в UI
			return result;
		},
		// Начальное состояние action
		{ error: null, success: false, newComment: null }
	);

	// 8. Обёртка над formAction для добавления оптимистичного обновления
	const handleFormAction = async (formData) => {
		// Получаем данные из формы
		const name = formData.get('name');
		const text = formData.get('message');

		// Проверяем, что поля не пустые
		if (!name.trim() || !text.trim()) {
			return { error: 'Заполните все поля', success: false };
		}

		// 1. Создаём объект оптимистичного комментария
		const optimisticComment = {
			name,
			text
		};

		// 2. ТРИГГЕРИМ ОПТИМИСТИЧНОЕ ОБНОВЛЕНИЕ
		// Это мгновенно обновит UI (добавит комментарий в список)
		addOptimisticComment(optimisticComment);

		// 3. Вызываем реальное действие (formAction)
		// Оно отправит "запрос", а в случае ошибки useOptimistic
		// автоматически откатит optimisticComments к актуальному состоянию (comments)
		return formAction(formData);
	};

	// 9. Функция для сброса формы после успешной отправки
	const resetForm = () => {
		const form = document.getElementById('comment-form');
		if (form) {
			form.reset();
		}
	};

	// 10. Эффект для очистки формы при успешной отправке
	// Можно было бы использовать reset() в action, но useEffect более декларативный
	useState(() => {
		if (state.success) {
			resetForm();
		}
	}, [state.success]);

	return (
		<section style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
			{/* 11. Заголовок с количеством комментариев */}
			<h2>Комментарии ({optimisticComments.length})</h2>

			{/* 12. Список комментариев (отображаем ОПТИМИСТИЧНЫЕ комментарии) */}
			<ul style={{
				listStyle: 'none',
				padding: 0,
				marginBottom: '30px'
			}}>
				{optimisticComments.map((comment) => (
					<li
						key={comment.id} // Важно: уникальный ключ для каждого элемента
						style={{
							padding: '15px',
							marginBottom: '10px',
							backgroundColor: '#f5f5f5',
							borderRadius: '8px',
							borderLeft: comment.isOptimistic ? '4px solid #ff9800' : '4px solid #4caf50',
							opacity: comment.isOptimistic ? 0.8 : 1
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong style={{ color: '#333' }}>{comment.name}</strong>
							{/* 13. Показываем статус комментария */}
							{comment.isOptimistic && (
								<span style={{
									fontSize: '0.8em',
									color: '#ff9800',
									fontStyle: 'italic'
								}}>
									Отправляется...
								</span>
							)}
						</div>
						<p style={{
							marginTop: '8px',
							color: '#555',
							lineHeight: '1.5'
						}}>
							{comment.text}
						</p>
					</li>
				))}
			</ul>

			{/* 14. Форма для добавления комментариев */}
			<form
				id="comment-form"
				action={handleFormAction} // Используем нашу обёртку
				style={{
					backgroundColor: '#f9f9f9',
					padding: '20px',
					borderRadius: '8px'
				}}
			>
				<div style={{ marginBottom: '15px' }}>
					<label
						htmlFor="name"
						style={{
							display: 'block',
							marginBottom: '5px',
							fontWeight: 'bold',
							color: '#333'
						}}
					>
						Имя:
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						disabled={isPending} // Блокируем при загрузке
						style={{
							width: '100%',
							padding: '10px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '16px',
							boxSizing: 'border-box'
						}}
					/>
				</div>

				<div style={{ marginBottom: '20px' }}>
					<label
						htmlFor="message"
						style={{
							display: 'block',
							marginBottom: '5px',
							fontWeight: 'bold',
							color: '#333'
						}}
					>
						Комментарий:
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows="4"
						disabled={isPending} // Блокируем при загрузке
						style={{
							width: '100%',
							padding: '10px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '16px',
							fontFamily: 'inherit',
							boxSizing: 'border-box',
							resize: 'vertical'
						}}
					/>
				</div>

				{/* 15. Кнопка отправки с индикацией загрузки */}
				<button
					type="submit"
					disabled={isPending}
					style={{
						backgroundColor: isPending ? '#ccc' : '#4caf50',
						color: 'white',
						border: 'none',
						padding: '12px 24px',
						borderRadius: '4px',
						fontSize: '16px',
						cursor: isPending ? 'not-allowed' : 'pointer',
						width: '100%',
						fontWeight: 'bold',
						transition: 'background-color 0.3s'
					}}
				>
					{isPending ? '⏳ Отправка...' : '📤 Отправить комментарий'}
				</button>

				{/* 16. Отображение ошибки */}
				{state.error && (
					<div style={{
						marginTop: '15px',
						padding: '10px',
						backgroundColor: '#ffebee',
						color: '#c62828',
						borderRadius: '4px',
						border: '1px solid #ffcdd2'
					}}>
						⚠️ {state.error}
					</div>
				)}

				{/* 17. Отображение успеха */}
				{state.success && !state.error && (
					<div style={{
						marginTop: '15px',
						padding: '10px',
						backgroundColor: '#e8f5e9',
						color: '#2e7d32',
						borderRadius: '4px',
						border: '1px solid #c8e6c9'
					}}>
						✅ Комментарий успешно отправлен!
					</div>
				)}
			</form>
		</section>
	);
}
