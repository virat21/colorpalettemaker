import React, { Component } from "react";

export default class AddColor extends Component {
  static defaultProps = {
    onAddColor: () => {}
  };
  render() {
    return (
      <span
        className="buttonswithicon"
        onClick={() => {
          this.props.onAddColor();
        }}
      >
        <i className="material-icons">add</i>Add
        Color
      </span>
    );
  }
}
