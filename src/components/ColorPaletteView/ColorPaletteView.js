import React, { Component } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Group
} from "react-konva";
import Color from "color";

export default class ColorPaletteView extends Component {
  static defaultProps = {
    colors: []
  };
  render() {
    let colors = this.props.colors;
    return (
      <div className="canvas">
        <Stage
          width={1080}
          height={1920}
          ref={e => (this.stage = e)}
        >
          <Layer>
            {colors.map((data, index) => {
              return (
                <Group
                  x={0}
                  y={
                    index * (1920 / colors.length)
                  }
                  key={index}
                >
                  <Rect
                    x={0}
                    y={0}
                    width={1080}
                    height={1920 / colors.length}
                    fill={data.color.hex()}
                  />
                  <Text
                    text={data.color.hex()}
                    fill={Color(
                      data.color.isDark()
                        ? data.color
                            .lighten(0.6)
                            .rotate(-10)
                            .saturate(0.5)
                        : data.color
                            .darken(0.6)
                            .rotate(10)
                            .saturate(0.5)
                    ).hex()}
                    fontSize={50}
                    fontFamily="Open Sans"
                    fontStyle="bolder"
                    x={100}
                    y={
                      1920 / colors.length / 2 -
                      20
                    }
                  />
                </Group>
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}
