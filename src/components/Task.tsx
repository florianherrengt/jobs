import * as React from 'react'
import * as Autocomplete from 'react-autocomplete'

export interface ITasksProps {
    tasks: object[],
    id: string,
    label: string,
    parentTask?: ITasksProps[],
    addTask: Function
}

export class Task extends React.Component<ITasksProps, any> {
    constructor(props: ITasksProps) {
        super(props)
        this.state = { value: '' }
    }
    private _onBlur = () => {
        this.props.addTask({ parentTaskId: this.props.id, value: this.state.value })
        this.setState({ value: '' })
    }
    public render() {
        return (
            <div>
                {this.props.label}
                <div style={{ marginLeft: 20 }}>
                    {
                        Object.keys(this.props.tasks)
                            .filter(id => this.props.tasks[id].parentTask && ~this.props.tasks[id].parentTask.indexOf(this.props.id))
                            .map(id => {
                                const task = this.props.tasks[id]
                                return <Task tasks={this.props.tasks} id={id} {...task} addTask={this.props.addTask} />
                            })
                    }
                    <Autocomplete
                        inputProps={{ onBlur: this._onBlur, style: { border: 'none', borderBottom: '1px solid lightgray' } }}
                        value={this.state.value}
                        shouldItemRender={(state, value) => state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1}
                        items={Object.keys(this.props.tasks).map(id => ({ id, ...this.props.tasks[id] }))}
                        getItemValue={item => item.label}
                        onChange={(event, value) => this.setState({ value })}
                        onSelect={value => this.setState({ value })}
                        renderItem={(item, isHighlighted) => (
                            <div style={{ padding: 20 }} key={item.id}>{item.label}</div>
                        )}
                    />
                </div>
            </div>
        )
    }
}
// style={{ border: 'none', borderBottom: '1px solid lightgray' }}