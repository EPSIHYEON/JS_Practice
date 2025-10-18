import React from "react";
import TodoItem from "./TodoItem";

// 1. TodoBoard가 받을 Props 타입 정의
interface TodoBoardProps {
    todoList: string[];
}

// (참고: TodoItem.tsx에 정의되어야 할 내용)
// interface TodoItemProps {
//     item: string;
// }


// 2. TodoBoard 컴포넌트 정의
// 💡 { todoList }로 구조 분해 할당을 사용했으므로, props.todoList가 아닌 todoList를 직접 사용합니다.
const TodoBoard = ({ todoList }: TodoBoardProps) => {
    console.log(todoList);
    
    return (
        <div>
            <h1>TodoList</h1>
            {/* 💡 map 함수 내에서 JSX를 반환할 때는 괄호 ()를 사용하고, key={index}를 추가해야 합니다. */}
            {todoList.map((item, index) => (
               <TodoItem key={index} item={item} />
            ))}
        </div>
    );
};

export default TodoBoard;