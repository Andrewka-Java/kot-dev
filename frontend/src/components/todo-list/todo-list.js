import './todo-list.scss'

import { Component } from 'react'
import TodoListItem from '../todo-list-item/todo-list-item'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            sort: false,
            search: ''
        }
        this.service = props.service
    }

    async componentDidMount() {
        try {
            const items = await this.service.fetchAllItems();
            this.setState({ items: items });
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    onDelete = (id) => {
        this.setState(({ items }) => ({
            items: items.filter(item => item.id !== id)
        }))
    }

    onAdd = () => {
        this.setState(({ items }) => ({
            items: [...items, { text: '', priority: 0 }]
        }))
    }

    onSort = async () => {
        async function sortFun(items, sort, service) {
            if (!sort) {
                return items.sort((i1, i2) => i2.priority - i1.priority)
            } else {
                return await service.fetchAllItems()
            }
        }
        const { items, sort } = this.state
        const sortedItems = await sortFun(items, sort, this.service)

        this.setState(({ sort }) => ({
            sort: !sort,
            items: sortedItems
        }))

    }

    onSearch = (e) => {
        this.setState(({ search: e.target.value }))
    }

    render() {
        const items = this.state.items
            .filter(item => item.text.toLowerCase().includes(this.state.search.toLowerCase()))
            .map(item => {
                return <TodoListItem
                    key={item.id}
                    {...item}
                    service={this.service}
                    onEdit={() => this.onEdit(item.id)}
                    onDelete={() => {
                        this.service.delete(item.id)
                        this.onDelete(item.id)
                    }}
                />
            })
        return (
            <div id="todo-main" >
                <div className='todo-main-header'>
                    <div>№</div>
                    <div style={{ margin: 'auto 0 auto 0' }}>
                        <input
                            className=''
                            type="text"
                            placeholder="Search"
                            name="search"
                            value={this.state.search}
                            onChange={this.onSearch} />
                    </div>
                    <div onClick={this.onSort}>
                        {
                            this.state.sort
                                ? <img src="/flag_active.png" alt="Priority filter enabled" />
                                : <img src="/flag.svg" alt="Priority filter disabled" />
                        }
                    </div>
                    <div></div>
                    <div onClick={this.onAdd}><img src="/plus.svg" alt="Add" /></div>
                </div>
                {items}
                <div className='todo-main-footer'>
                </div>
            </div>
        )
    }
}

export default TodoList