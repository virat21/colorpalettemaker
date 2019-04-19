import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import Color from "color";
import colorString from "color-string";
import arrayMove from "array-move";

const DragHandle = SortableHandle(() => (
  <span>
    <i className="material-icons">drag_handle</i>
  </span>
));

const SortableItem = SortableElement(
  ({ value, index, onChange, onDelete }) => (
    <div className="sortablecoloritem">
      <input
        type="text"
        defaultValue={value.color.hex()}
        onChange={e => {
          let val = e.currentTarget.value;
          if (colorString.get(val) !== null) {
            onChange(val, index);
          }
        }}
      />
      <span
        onClick={() => {
          onDelete(index);
        }}
      >
        <i className="material-icons">delete</i>
      </span>
      <DragHandle />
    </div>
  )
);

const SortableList = SortableContainer(
  ({ items, onChange, onDelete }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            onChange={(value, index) => {
              onChange(value, index);
            }}
            onDelete={index => {
              onDelete(index);
            }}
          />
        ))}
      </div>
    );
  }
);

export default class SortableColorInputView extends Component {
  constructor(props) {
    super(props);

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  static defaultProps = {
    colors: [],
    onChange: () => {}
  };

  onSortEnd({ oldIndex, newIndex }) {
    this.props.onChange(
      arrayMove(
        this.props.colors,
        oldIndex,
        newIndex
      )
    );
  }
  render() {
    return (
      <SortableList
        items={this.props.colors}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        useDragHandle={true}
        lockToContainerEdges={true}
        onChange={(value, index) => {
          this.props.colors[index].color = Color(
            value
          );
          this.props.onChange(this.props.colors);
        }}
        onDelete={index => {
          this.props.colors.splice(index, 1);
          this.props.onChange(this.props.colors);
        }}
      />
    );
  }
}
