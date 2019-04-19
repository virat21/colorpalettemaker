import Color from "color";
export let getColorsFromHash = () => {
  if (window.location.hash.length) {
    try {
      let colorJson = JSON.parse(
        decodeURI(window.location.hash).replace(
          "#",
          ""
        )
      );

      if (colorJson.constructor === Array) {
        return colorJson.map(data => {
          return {
            color: Color(`#${data}`)
          };
        });
      }
    } catch (e) {
      console.log("failed to parse color json");
    }
  }

  return [];
};
