import { useState } from "react";
import "./App.css";

import { getStroke } from "perfect-freehand";

import { db } from "./db";
import { ref, set } from "firebase/database";
import {
  TrashIcon,
  DocumentPlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Generate a random UUID
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const options = {
  size: 10,
  thinning: 1,
  smoothing: 1,
  streamline: 1,
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
  const [pathColors, setPathColors] = useState([[]]);
  const [loading, setLoading] = useState(false);
  const [colors, setcolors] = useState(["#00FFFF", "#FF00FF", "#FFFF00", "#000000"]);
  const [color, setcolor] = useState("#000000");

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
    setPathColors([...pathColors,color])
  }

  function handlePointerMove(e) {
    
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
  const clear = () => {
    setPoints([[[]]]);
    setPathDatum([]);
    setPathColors([[]])
  };
  const addPicture = () => {
    setLoading(true);
    var uuid = uuidv4();

    set(ref(db, "/rooms/id1/pictures/" + uuid), pathDatum)
      .then(() => {
        console.log("Data written successfully");
        setLoading(false);
        clear();
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };
  
  return (
    <div>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{ touchAction: "none" }}
        className="container"
      >
        {pathDatum.map((path, i) => (
          <path key={"p" + i} d={path} fill={pathColors[i]}/>
        ))}
      </svg>
      <div className="controls-down">
        
      {colors.map((color, i) => 
            <button key={"color" + i} className="color" onClick={()=>{setcolor(color)}} style={{
              background: color
            }}/>
          )}
        <button onClick={clear} className="add-figure-button">
          <TrashIcon />
        </button>
        <button onClick={addPicture} className="add-figure-button">
          
          {!loading && <DocumentPlusIcon />}
          {loading && <ArrowPathIcon className="loadingIcon" />}
        </button>
      </div>
    </div>
  );
}

export default Draw;
