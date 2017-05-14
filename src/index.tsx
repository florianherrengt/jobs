import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Task, ITasksProps } from './components/Task'

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        const tasks = {
            '1': {
                label: 'Job1'
            },
            '2': {
                label: 'Job2',
                parentTask: ['1']
            },
            '3': {
                label: 'Job3',
                parentTask: ['1']
            },
            '4': {
                label: 'Job4',
                parentTask: ['3']
            },
            '5': {
                label: 'Job5'
            },
            '6': {
                label: 'Job6',
                parentTask: ['1']
            }
        }
        this.state = { tasks }
    }
    private _addTasks = ({ parentTaskId, value }) => {
        // console.log(this.state.tasks)
        const existingTaskId = Object.keys(this.state.tasks).filter(id => this.state.tasks[id].label === value)[0]
        // debugger
        // const existingTaskId = Object.keys(this.props.tasks).filter(id => this.props.tasks[id].label === value)[0]
        console.log({ parentTaskId, value, existingTaskId })
        const tasks = this.state.tasks
        if (existingTaskId) {
            if (!tasks[existingTaskId].parentTask) {
                tasks[existingTaskId].parentTask = []
            }
            tasks[existingTaskId].parentTask.push(parentTaskId)
        } else {
            tasks[new Date().valueOf()] = { label: value, parentTask: [parentTaskId] }
        }
        this.setState({ tasks: { ...tasks } })
    }
    render() {
        // console.log(this.state.tasks)
        return (
            <div>
                {
                    Object.keys(this.state.tasks)
                        .filter(id => !this.state.tasks[id].parentTask)
                        .map(id => {
                            const task = this.state.tasks[id]
                            return <Task tasks={this.state.tasks} id={id} {...task} addTask={this._addTasks} />
                        })
                }
            </div >
        )
    }
}

ReactDOM.render(<App button="ab" />, document.getElementById('main'))