import React from 'react';
import  {render} from 'react-dom'
import {Authorize} from './Pages/authorize'
import {Button, Checkbox, Form} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'


class App extends React.Component {

    render() {
        return (
            <Authorize/>

        )
    }
}

render(<App/>, document.getElementById("app"));