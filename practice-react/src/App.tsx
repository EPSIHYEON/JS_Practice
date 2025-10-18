import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoBoard from "./components/TodoBoard"

function App() {
  //const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [todoList,setTodoList] = useState<string[]>([])
    const addItem = () => {
      if (inputValue.trim() === "") return;
      console.log("Im hererere", inputValue)
      setTodoList([...todoList, inputValue])
    }
  return (
    <>
    <main>
      <TodoBoard todoList={todoList}></TodoBoard>
      <input value ={inputValue} type="text" onChange={(event)=>setInputValue(event.target.value)}></input>
      <button onClick={addItem}>추가</button>
      
    </main>
    </>
  )
}

export default App
