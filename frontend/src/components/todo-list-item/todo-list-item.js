import './todo-list-item.scss'

import { Component } from 'react'

class TodoListItem extends Component {
    constructor(props) {
        super(props)
        const editable = !props.text && !props.priority
        this.state = {
            editable: editable,
            id: props.id,
            text: props.text,
            priority: props.priority,

            _text: props.text,
            _priority: props.priority
        }
        this.service = props.service
    }

    onEdit = () => {
        const { editable, id, _text, _priority } = this.state
        this.service.edit(id, _text, _priority).then(item => {
            this.setState(() => {
                return {
                    editable: !editable,
                    text: item.text,
                    priority: item.priority
                }
            })
        })
    }

    onSave = () => {
        const { editable, _text, _priority } = this.state
        this.service.add(_text, _priority).then(item => {
            this.setState(() => {
                return {
                    editable: !editable,
                    id: item.id,
                    text: item.text,
                    priority: item.priority
                }
            })
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { onDelete } = this.props

        return (
            <div className='todo-main-item'>
                <div>{this.state.id}</div>
                <div style={{ margin: 'auto 0 auto 0' }}>
                    {
                        this.state.editable
                            ? <input
                                type="text"
                                name="_text"
                                value={this.state._text}
                                onChange={this.onChange}
                                style={{ width: '100%' }} />
                            : this.state.text
                    }
                </div>
                <div>
                    {
                        this.state.editable
                            ? <input
                                type="text"
                                name="_priority"
                                value={this.state._priority}
                                onChange={this.onChange}
                                style={{ width: '35px' }} />
                            : this.state.priority
                    }
                </div>
                <div>
                    {
                        this.state.editable
                            ? <div onClick={!this.props.id ? this.onSave : this.onEdit}><img src="/marker_active.svg" alt="Save"></img></div>
                            : <div onClick={this.onEdit}><img src="/marker.svg" alt="Edit"></img></div>
                    }
                </div>
                <div onClick={onDelete}><img src="/cross.svg" alt="Remove"></img></div>
            </div >
        )
    }

}

export default TodoListItem