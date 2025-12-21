// 'src/App.jsx'
import TodoList  from './components/TodoList/TodoList';
import styles from './App.module.css'

export function App() {
	return (
		<>
			<div className={styles.app}>
			 <h1>The compiler of current tasks</h1>
				<TodoList />
			</div>
		</>
	);
}

