import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Surface} from 'react-createjs';

class App extends Component {
  render() {
    return (
    	<div>
    		<Surface/>
    	</div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('main'));
