import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Task, ITasksProps } from './components/Task'
import { EditTaskInput } from './components/EditTaskInput'

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')
        this.state = { tasks }
    }
    private _addTasks = ({ parentTaskId, value }) => {
        if (!value) { return false }
        const { tasks } = this.state
        if (!parentTaskId) {
            tasks[new Date().valueOf()] = { label: value }
            this.setState({ tasks: { ...tasks } })
            return this._saveTasks()
        }
        const existingTaskId = Object.keys(this.state.tasks).filter(id => this.state.tasks[id].label === value)[0]
        if (existingTaskId) {
            if (existingTaskId === parentTaskId) { return false }
            if (!tasks[existingTaskId].parentTask) {
                tasks[existingTaskId].parentTask = []
            }
            tasks[existingTaskId].parentTask.push(parentTaskId)
        } else {
            tasks[new Date().valueOf()] = { label: value, parentTask: [parentTaskId] }
        }
        this.setState({ tasks: { ...tasks } })
        this._saveTasks()
    }
    private _editTask = ({ id, value }) => {
        if (!value) { return false }
        const { tasks } = this.state
        tasks[id].label = value
        this.setState({ tasks: JSON.parse(JSON.stringify(tasks)) })
        this._saveTasks()
    }
    private _saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }
    render() {
        console.log(this.state.tasks)
        return (
            <div>
                {
                    Object.keys(this.state.tasks)
                        .filter(id => !this.state.tasks[id].parentTask)
                        .map(id => {
                            const task = this.state.tasks[id]
                            return <Task
                                tasks={this.state.tasks}
                                id={id} {...task}
                                addTask={this._addTasks}
                                editTask={this._editTask}
                            />
                        })
                }
                <div style={{ marginTop: 20 }}>
                    <EditTaskInput
                        placeholder="Add new task..."
                        onBlur={(value) => this._addTasks({ parentTaskId: null, value })}
                    />
                </div>
            </div >
        )
    }
}

ReactDOM.render(<App button="ab" />, document.getElementById('main'))