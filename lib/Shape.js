import React, {PropTypes} from 'react';

import Container from './Container';


export class Shape extends Container{
  static propTypes = {
    draw: PropTypes.oneOf(['circle']),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    fill: PropTypes.string
  };

  draw() {
    this._shape = new window.createjs.Shape();
    this._shape.x = this.props.x;
    this._shape.y = this.props.y;

    if (this.props.fill) {
      this._shape.graphics.beginFill(this.props)
    }
    const drawFunc = `draw${ucfirst(this.props.draw)}`;
    this._shape.graphics.beginFill(this.props.fill)[drawFunc].apply(this._shape.graphics, this.props.data);

    return this._shape;
  }
}


function ucfirst(str) {
  str += '';
  var f = str.charAt(0)
    .toUpperCase();
  return f + str.substr(1);
}
