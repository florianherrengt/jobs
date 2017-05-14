import * as React from 'react'

export class EditTaskInput extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = { value: props.label }
    }
    private _onChange = (event) => {
        this.setState({ value: event.target.value })
    }
    private _onBlur = (event) => {
        this.props.onBlur(this.state.value)
        this.setState({ value: '' })
    }
    public render() {
        return (
            <input
                placeholder={this.props.placeholder}
                onChange={this._onChange}
                onBlur={this._onBlur}
                value={this.state.value} />
        )
    }
}