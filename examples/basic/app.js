import React, {Component} from 'react';

import {Stage, Shape} from 'react-createjs';


class MyCircle extends Component {
  getData() {
    return [0, 0, 40];
  }
  render() {
    return (
      <Shape fill="#000" draw="circle" data={this.getData()} x={60} y={50} />
      )
  }
}

export class App extends Component {
  render() {
    return (
    	<div>
    		<Stage>
          <MyCircle />
        </Stage>
    	</div>
    );
  }
}
