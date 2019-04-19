import React, { Component } from "react";
import "./App.css";
import Konva from "konva";
import Color from "color";

import ColorPaletteView from "./components/ColorPaletteView/ColorPaletteView";
import SortableColorInputView from "./components/SortableColorInputView/SortableColorInputView";
import AddColor from "./components/AddColor/AddColor";
import DownloadColors from "./components/DownloadColors/DownloadColors";
import { getColorsFromHash } from "./components/utils/getArrayFromHash";
import GitHubButton from "react-github-btn";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: getColorsFromHash()
    };
  }

  componentDidUpdate() {
    window.location.hash = JSON.stringify(
      this.state.colors.map(d =>
        d.color.hex().replace("#", "")
      )
    );
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <i className="material-icons">
            color_lens
          </i>
          Color Palette Maker{" "}
          <span
           style={{
              marginLeft: "15px"
            }}
          >
          <GitHubButton
            href="https://github.com/virat21/colorpalettemaker"
            data-show-count="true"
            aria-label="Star virat21/colorpalettemaker on GitHub"
           
          >
            Star
          </GitHubButton>
          </span>
          
        </div>
        <div className="bottom">
          <div className="sidebar">
            <div className="sortableColors">
              <SortableColorInputView
                colors={this.state.colors}
                onChange={colors => {
                  this.setState({ colors });
                }}
              />
            </div>

            <div className="buttonsPanel">
              <AddColor
                onAddColor={() => {
                  this.setState(s => {
                    s.colors.push({
                      color: Color(
                        Konva.Util.getRandomColor()
                      )
                    });

                    return { colors: s.colors };
                  });
                }}
              />

              <DownloadColors
                stage={() =>
                  this.colorpaletteview.stage
                }
              />
            </div>
          </div>
          <div className="mainContent">
            <ColorPaletteView
              colors={this.state.colors}
              ref={e =>
                (this.colorpaletteview = e)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
