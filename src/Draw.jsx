import { useState } from "react";
import "./App.css";

import { getStroke } from "perfect-freehand";

const options = {
  size: 32,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
};
function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

function Draw() {
  //const [count, setCount] = useState(0)
  const [points, setPoints] = useState([[[]]]);
  const [pathDatum, setPathDatum] = useState([[]]);

  function handlePointerDown(e) {
    console.log("pointer down");
    e.target.setPointerCapture(e.pointerId);
    //console.log(e.pageX, e.pageY, e.pressure)
    //setPoints([[e.pageX, e.pageY, e.pressure]]);
    if (points.length) {
      setPoints([...points, [[e.pageX, e.pageY, e.pressure]]]);
    } else {
      setPoints([[[e.pageX, e.pageY, e.pressure]]]);
    }
  }

  function handlePointerMove(e) {
    console.log("pointer move", e.buttons);
    if (e.buttons !== 1) return;

    let p = points;
    let curr = p[points.length - 1];
    let curr_new = [...curr, [e.pageX, e.pageY, e.pressure]];
    //curr = curr_new
    p[points.length - 1] = curr_new;

    setPoints(p);
    setPathDatum(
      p.map((points) => {
        const stroke = getStroke(points, options);

        return getSvgPathFromStroke(stroke);
      })
    );

    //setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  }

  //const stroke = getStroke(points, options);

  //console.log(stroke)
  //const pathData = getSvgPathFromStroke(stroke);

  const addPicture = () => {
    alert("added new path");

    setPoints([[[]]]);
    setPathDatum([]);
  };
  return (
    <div>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{ touchAction: "none" }}
      >
        {pathDatum.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
      <button onClick={addPicture} className="add-figure-button">
        +
      </button>
    </div>
  );
}

export default Draw;
