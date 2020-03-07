import ReactDOM from "react-dom";
import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>
                Hi there...
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));