import React from 'react';
import  {render} from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            message: 'something'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState( {input: e.target.value} );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({message: this.state.input});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.input} onChange = { this.handleChange } />
                    </label>
                    <button type="submit">完了</button>
                    <p>{ this.state.input }</p>
                    <p>{ this.state.message }</p>
                </form>
            </div>
        )
    }
}

render(<App/>, document.getElementById("app"));