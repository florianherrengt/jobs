import * as React from 'react'
import { AutocompleteTask } from './Autocomplete'
import { EditTaskInput } from './EditTaskInput'

export interface ITasksProps {
    tasks: object[],
    id: string,
    label: string,
    parentTask?: ITasksProps[],
    addTask: Function,
    editTask: Function
}

export class Task extends React.Component<ITasksProps, any> {
    constructor(props: ITasksProps) {
        super(props)
        this.state = { value: '', isEditing: false }
    }
    private _onAdd = (value) => {
        this.props.addTask({ parentTaskId: this.props.id, value })
    }
    private _onEdit = (value) => {
        this.props.editTask({ id: this.props.id, value })
        this.setState({ isEditing: false })
    }
    public render() {
        return (
            <div>
                {
                    this.state.isEditing ?
                        <EditTaskInput onBlur={this._onEdit} label={this.props.label} /> :
                        <div onClick={() => this.setState({ isEditing: true })}>{this.props.label}</div>
                }
                <div style={{ marginLeft: 20 }}>
                    {
                        Object.keys(this.props.tasks)
                            .filter(id => this.props.tasks[id].parentTask && ~this.props.tasks[id].parentTask.indexOf(this.props.id))
                            .map(id => {
                                const task = this.props.tasks[id]
                                return <Task
                                    tasks={this.props.tasks}
                                    id={id}
                                    addTask={this.props.addTask}
                                    editTask={this.props.editTask}
                                    {...task}
                                />
                            })
                    }
                    <AutocompleteTask
                        tasks={this.props.tasks}
                        onBlur={value => this._onAdd(value)}
                    />
                </div>
            </div>
        )
    }
}
