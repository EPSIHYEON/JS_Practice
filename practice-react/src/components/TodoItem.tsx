import React from "react";


interface TodoItemProps {
    item: string;
}


function TodoItem({ item }: TodoItemProps){
    return(
        <div className="todo-item">
      <h4>{item}</h4>
      </div>
    )
}

export default TodoItem