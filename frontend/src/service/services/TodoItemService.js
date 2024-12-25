import TodoItem from '../model/TodoItem'

class TodoItemService {

    static api = process.env.REACT_APP_BACKEND_URL || "http://localhost:8099/api";

    async fetchAllItems() {
        const response = await fetch(`${TodoItemService.api}/items`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        return await response.json().then(data => {
            return data.map(({ id, todoItemName, priority }) => new TodoItem(id, todoItemName, priority))
        })
    }

    async add(text, priority) {
        const todoItem = {
            todoItemName: text,
            priority: priority
        }

        return await this.change(todoItem, async () =>
            await fetch(`${TodoItemService.api}/items`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todoItem)
            })
        )
    }

    async edit(id, text, priority) {
        const todoItem = {
            id: id,
            todoItemName: text,
            priority: priority
        }

        return await this.change(todoItem, async () =>
            await fetch(`${TodoItemService.api}/items/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todoItem)
            })
        )
    }

    async delete(id) {
        fetch(`${TodoItemService.api}/items/${id}`, { method: "DELETE" })
    }

    async change(item, callback) {
        if (!item.id && (!item.todoItemName || isNaN(item.priority))) {
            throw new Error(`Edit data is not correct`)
        }

        const response = await callback()
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        return new TodoItem(data.id, data.todoItemName, data.priority)
    }

}

export default TodoItemService