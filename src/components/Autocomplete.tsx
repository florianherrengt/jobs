import * as React from 'react'
import * as Autocomplete from 'react-autocomplete'

export class AutocompleteTask extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }
    private _onBlur = () => {
        this.props.onBlur(this.state.value)
        this.setState({ value: '' })
    }
    public render() {
        return (
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
        )
    }
}