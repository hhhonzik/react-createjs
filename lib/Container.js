import React from 'react';

export default class Container extends React.Component{
  static isEaselJSComponent = true;

  draw () {
    console.log('draw element');
  }
  render() {
    throw new Error('Do not render CreateJS component outside of <Stage>');
  }
}
