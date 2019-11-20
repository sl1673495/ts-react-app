import React from 'react'
import axios from '../api/axios'

interface Props {
  refreshTodos: () => void
}

const TodoForm: React.FC<Props> = ({ refreshTodos }) => {
  const [name, setName] = React.useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo = {
      id: Math.random(),
      name,
      done: false
    }
    
    if (name.trim()) {
      // 这边第二个参数没有做类型约束
      axios('/api/add', newTodo)
      refreshTodos()
      setName('')
    }
  }

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        className="todo-input"
        value={name}
        onChange={onChange}
        placeholder="请输入待办事项"
      />
      <button type="submit">新增</button>
    </form>
  )
}

export default TodoForm
