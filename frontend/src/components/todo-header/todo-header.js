import './todo-header.scss'

const TodoHeader = (props) => {
    return (
        <div id="todo-header">
            <h1 className={props.rgba}>
                <span id="t">T</span>
                <span id="o-first">O</span>
                <span id="d">D</span>
                <span id="o-last">O</span>
            </h1>
        </div>
    )
}

export default TodoHeader