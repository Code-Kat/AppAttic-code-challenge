import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { TextField, ColorPicker } from "@shopify/polaris";

function App() {
  const [image, setImage] = useState();
  const [text, setText] = useState("Click on a color to get started!");
  const [colour, setColour] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
    alpha: 1,
  });

  useEffect(() => {
    fetch(
      `http://localhost:3001/?text=${text}&hue=${colour.hue}&brightness=${
        colour.brightness * 100
      }&saturation=${colour.saturation * 100}&alpha=${
        colour.alpha
      }&stringLength=${text.length}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setImage(data.image));
  }, [text, colour]);

  const handleTextChange = useCallback((newText) => setText(newText), []);

  return (
    <div className="app">
      <div className="textInput">
        <TextField
          label="Quote"
          value={text}
          onChange={handleTextChange}
          maxLength={100}
        />
      </div>
      <div className="colorPicker">
        <ColorPicker onChange={setColour} color={colour} allowAlpha={true} />
      </div>
      <img src={image} alt="quote" />
      <div className="footer">Github repo: </div>
    </div>
  );
}

export default App;