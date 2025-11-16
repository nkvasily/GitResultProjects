// import { useState } from 'react';

// const getTimeFromDate = (date) => date.toISOString().substring(11, 19);
// export

export const MyComponent = () => {
	// const [currentDate, setCurrentDate] = useState(new Date());

	// setTimeout(() => {
	// 	setCurrentDate(new Date());
	// }, 1000);

	// const currentTime = getTimeFromDate(currentDate);

	// return (
	// 	<div>{currentTime}</div>
	// );
}

// let obj1 = { a: 10 };
// console.log('10obj1', obj1); // 10obj1 {a: 10}

// // это мутирование переменной (замена свойства объекта)
// obj1.a = 20;
// console.log('20obj1', obj1); // 20obj1 {a: 20}

// const obj2 = obj1;
// console.log('obj2 = obj1', obj2); // obj2 = obj1 {a: 20}

// // а это изменение переменной (замена на другое значение)
// obj1 = { a: 20 };
// console.log('obj1', obj1); // obj1 {a: 20}

// console.log(obj1 === obj2); // false


let arr = ["Ilya", "Kantor"];
let [firstName, surname] = arr;
console.log(firstName);
console.log(surname);

let [a, b, c] = "abc";
console.log(a);
console.log(b);
console.log(c);

let [one, two, three] = new Set([10, 20, 30]);
console.log(one);
console.log(two);
console.log(three);
