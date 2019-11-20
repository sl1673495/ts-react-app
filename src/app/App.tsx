import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import TodoForm from './TodoForm'
import axios from '../api/axios'
import '../styles/App.css'

type Todo = {
  id: number
  // 名字
  name: string
  // 是否完成
  done: boolean
}

type Todos = Todo[]

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos>([])

  const refreshTodos = () => {
    // 这边必须手动声明axios的返回类型。
    axios<Todos>('/api/todos').then(setTodos)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const onToggleTodo = async (todo: Todo) => {
    // 这边第二个参数没有做类型约束
    await axios('/api/toggle', todo.id)
    refreshTodos()
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <TodoForm refreshTodos={refreshTodos} />
          {todos.map((todo, index) => {
            return (
              <li
                onClick={() => onToggleTodo(todo)}
                key={index}
                className={classNames({
                  done: todo.done
                })}
              >
                {todo.name}
              </li>
            )
          })}
        </ul>
      </header>
    </div>
  )
}

export default App
