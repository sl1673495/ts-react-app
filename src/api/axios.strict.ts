let todos = [
  {
    id: 1,
    name: '待办1',
    done: false
  },
  {
    id: 2,
    name: '待办2',
    done: false
  },
  {
    id: 3,
    name: '待办3',
    done: false
  }
]


export enum Urls {
  TODOS = '/api/todos',
  TOGGLE = '/api/toggle',
  ADD = '/api/add',
}

type Todo = typeof todos[0]
type Todos = typeof todos

type Key<U> =
  U extends Urls.TOGGLE ? 'toggle': 
  U extends Urls.ADD ? 'add': 
  U extends Urls.TODOS ? 'todos': 
  'other'

type Payload<U> = {
  toggle: number
  add: Todo,
  todos: any,
  other: any
}[Key<U>]

type Result<U> = {
  toggle: boolean
  add: boolean,
  todos: Todos
  other: any
}[Key<U>]

type UrlNoPayload =  Urls.TODOS
type UrlWithPayload = Exclude<Urls, UrlNoPayload>

function axios <U extends UrlNoPayload>(url: U): Promise<Result<U>>
function axios <U extends UrlWithPayload>(url: U, payload: Payload<U>): Promise<Result<U>> | never
function axios <U extends Urls>(url: U, payload?: Payload<U>): Promise<Result<U>> | never {
  let data
  switch (url) {
    case Urls.TODOS: {
      data = todos.slice()
      break
    }
    case Urls.TOGGLE: {
      const todo = todos.find(({ id }) => id === payload)
      if (todo) {
        todo.done = !todo.done
      }
      data = true
      break
    }
    case Urls.ADD: {
      todos.push(payload!)
      data = true
      break
    }
    default: {
      throw new Error('Unknown api')
    }
  }

  return Promise.resolve(data as any)
}

export default axios
