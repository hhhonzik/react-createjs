import React from 'react';
import EaselJsRenderer from './EaselJsRenderer';

const {PropTypes, Component} = React;

export class Stage extends Component{
  static propTypes = {
    scale: PropTypes.number
  };
  static defaultProps = {
    scale: window.devicePixelRatio || 1
  };

  constructor (props, context) {
    super(props, context);
  }
  componentDidMount() {
    const canvas = this.refs.canvas;
    this._stage = new window.createjs.Stage(canvas);
    this._renderChildren();
    this._stage.update();
  }
  componentDidUpdate() {
    this._renderChildren();
    this._stage.update();

  }
  _renderChildren() {
    this._stage.clear();
    React.Children.map(this.props.children, (child) => {
      let el = child.type;
      let newProps = child.props;
      // this doesn't mount anything to VirtualDOM :(
      while(!el.isEaselJSComponent && el) {
        el = new el(newProps, this.context);
        newProps = el.render().props;
        el = el.render().type;
      }
      const CreateJsElement = new el(newProps);
      this._stage.addChild(CreateJsElement.draw());
    });
  }
  render() {
  	return (
  		<canvas ref="canvas" />
  	);
  }
}
