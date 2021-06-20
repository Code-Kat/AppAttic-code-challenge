const express = require("express");
const app = express();
const textToImage = require("text-to-image");
const cors = require("cors");
const colorsys = require("colorsys");

const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/", function (req, res) {
  const rgb = colorsys.hsv_to_rgb({
    h: req.query.hue,
    s: req.query.saturation,
    v: req.query.brightness,
  });
  const rgba = `rgba(${rgb.r},${rgb.g}, ${rgb.b}, ${req.query.alpha})`;
  const stringLength = req.query.stringLength > 60 ? 45 : 55;
  textToImage
    .generate(req.query.text, {
      bgColor: "black",
      customHeight: 500,
      fontSize: stringLength,
      fontFamily: "Lato",
      fontPath: "Lato-BoldItalic.ttf",
      margin: 150,
      textAlign: "center",
      textColor: rgba,
      maxWidth: 1000,
      verticalAlign: "center",
      lineHeight: 70,
    })
    .then((dataUri) => {
      res.send({ image: dataUri });
    });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
