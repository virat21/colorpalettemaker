import React, { Component } from "react";

export default class DownloadColors extends Component {
  render() {
    return (
      <span
        className="buttonswithicon"
        onClick={() => {
          let downloadURI = (uri, name) => {
            var link = document.createElement(
              "a"
            );
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };

          var dataURL = this.props
            .stage()
            .toDataURL();
          downloadURI(
            dataURL,
            `${new Date()}.png`
          );
        }}
      >
        <i className="material-icons">save_alt</i>
        Download
      </span>
    );
  }
}
