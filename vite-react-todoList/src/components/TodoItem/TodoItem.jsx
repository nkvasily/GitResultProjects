// src/components/TodoItem/TodoItem.jsx
import React, { useState } from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.title);

	// Обработчик изменения статуса (чекбокс)
	const handleToggle = async () => {
		try {
			// Отправляем PATCH запрос для обновления только completed
			await onUpdate(todo.id, { completed: !todo.completed });
		} catch (error) {
			console.error('Ошибка при изменении статуса:', error);
		}
	};

	// Обработчик начала редактирования
	const handleEdit = () => {
		setIsEditing(true);
		setEditText(todo.title);
	};

	// Обработчик сохранения редактирования
	const handleSave = async () => {
		if (!editText.trim()) {
			alert('Текст задачи не может быть пустым');
			return;
		}

		try {
			await onUpdate(todo.id, { title: editText.trim() });
			setIsEditing(false);
		} catch (error) {
			console.error('Ошибка при сохранении:', error);
		}
	};

	// Обработчик отмены редактирования
	const handleCancel = () => {
		setIsEditing(false);
		setEditText(todo.title);
	};

	// Обработчик удаления
	const handleDelete = async () => {
		if (window.confirm(`Удалить задачу "${todo.title}"?`)) {
			try {
				await onDelete(todo.id);
			} catch (error) {
				console.error('Ошибка при удалении:', error);
			}
		}
	};

	if (isEditing) {
		// Режим редактирования
		return (
			<li className={styles.item}>
				<input
					type="text"
					value={editText}
					onChange={(e) => setEditText(e.target.value)}
					className={styles.editInput}
					autoFocus
				/>
				<div className={styles.editActions}>
					<button onClick={handleSave} className={styles.saveBtn}>
						Сохранить
					</button>
					<button onClick={handleCancel} className={styles.cancelBtn}>
						Отмена
					</button>
				</div>
			</li>
		);
	}

	// Режим просмотра
	return (
		<li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleToggle}
				className={styles.checkbox}
			/>

			<span
				className={styles.title}
				onDoubleClick={handleEdit}
				title="Двойной клик для редактирования"
			>
				{todo.title}
			</span>

			<div className={styles.actions}>
				<button onClick={handleEdit} className={styles.editBtn}>
					Редактировать
				</button>
				<button onClick={handleDelete} className={styles.deleteBtn}>
					Удалить
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
