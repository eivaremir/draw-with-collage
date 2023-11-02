import { useState } from "react";
import "./App.css";

import { getStroke } from "perfect-freehand";

import { db } from "./db";
import { ref, set } from "firebase/database";
import {
  TrashIcon,
  DocumentPlusIcon,
  ArrowPathIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
//import { Dialog } from "Dialog";
import Contact from "./Contact";

// Generate a random UUID
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const options = {
  size: 15,
  thinning: 1,
  smoothing: 1,
  streamline: 1,
  easing: (t) => t,
  // start: {
  //   taper: 0,
  //   easing: (t) => t,
  //   cap: true,
  // },
  // end: {
  //   taper: 100,
  //   easing: (t) => t,
  //   cap: true,
  // },
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
  const [enviado, setEnviado] = useState(false);
  const [colors, setcolors] = useState([
    "#FCB449",
    "#8293CA",
    "#08B3E2", "#E3E3E3", "#EE2D30",
    "#9ACB57", "#5763AD",
    "#1E4592", "#2CBCAF",
  ]);
  const [color, setcolor] = useState("#FCB449");

  function handlePointerDown(e) {
    const element = document.getElementById('canvas'); // Replace with the actual ID or reference to your element

    // Get the coordinates
    const rect = element.getBoundingClientRect();

    // The x and y coordinates are relative to the viewport
    const x = rect.left;
    const y = rect.top;

    console.log('X coordinate: ' + x);
    console.log('Y coordinate: ' + y);
    console.log("pointer down", e);
    e.target.setPointerCapture(e.pointerId);
    //console.log(e.pageX, e.pageY, e.pressure)
    //setPoints([[e.pageX, e.pageY, e.pressure]]);
    if (points.length) {
      setPoints([...points, [[e.pageX - x, e.pageY - y, e.pressure]]]);
    } else {
      setPoints([[[e.pageX - x, e.pageY - y, e.pressure]]]);
    }
    setPathColors([...pathColors, color]);
  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return;
    const element = document.getElementById('canvas'); // Replace with the actual ID or reference to your element

    // Get the coordinates
    const rect = element.getBoundingClientRect();

    // The x and y coordinates are relative to the viewport
    const x = rect.left;
    const y = rect.top;

    console.log('X coordinate: ' + x);
    console.log('Y coordinate: ' + y);
    console.log("pointer down", e);

    let p = points;
    let curr = p[points.length - 1];
    let curr_new = [...curr, [e.pageX - x, e.pageY - y, e.pressure]];
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
    setPathDatum([[]]); //change from ([]) to ([[]])
    setPathColors([[]]);
  };
  // const addPicture = () => {
  //   setLoading(true);
  //   var uuid = uuidv4();

  //   set(ref(db, "/rooms/id1/pictures/" + uuid), pathDatum)
  //     .then(() => {
  //       console.log("Data written successfully");
  //       setLoading(false);
  //       clear();
  //     })
  //     .catch((error) => {
  //       console.error("Error writing data:", error);
  //     });

  // };


  //const [datosRecibidos, setDatosRecibidos] = useState(null);

  const recibirDatos = (nombre, contacto) => {
    setLoading(true);
    var uuid = uuidv4();
    const datos = { nombre, contacto };

    set(ref(db, "/participant/id1/contact/" + uuid), datos)
      .then(() => {
        console.log("Data written successfully");

        // setDatosRecibidos(datos);
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });

    set(ref(db, "/rooms/id1/pictures/" + uuid), pathDatum)
      .then(() => {
        setLoading(false);
        clear();
        setEnviado(true)
        console.log("Data written successfully");

      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });

    set(ref(db, "/rooms/id1/color/" + uuid), pathColors)
      .then(() => {
        console.log("Data written successfully");

      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });

  };


  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      justifyContent: "space-around"
    }}>
      <svg
        id="canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          touchAction: "none",
          width: "500px",
          height: "500px",
          border: "1px red solid"
        }}
        className="container"
      >
        {pathDatum.map((path, i) => (
          <path key={"p" + i} d={path} fill={pathColors[i]} />
        ))}
      </svg>
      <div className="controls-up">
        <Link to="/">
          <button className="button">
            <ArrowSmallLeftIcon />
          </button>
        </Link>
      </div>
      <div className="controls-down">
        {colors.map((color, i) => (
          <button
            key={"color" + i}
            className="color"
            onClick={() => {
              setcolor(color);
            }}
            style={{
              background: color,
            }}
          />
        ))}
        <button onClick={clear} className="button">
          <TrashIcon />
        </button>

        {/* <button onClick={() => { document.getElementById('idd').showModal() }} className="button">
          {!loading && <DocumentPlusIcon />}
          {loading && <ArrowPathIcon className="loadingIcon" />}
        </button> */}

        {console.log("PATHDATUM", pathDatum)}

        {
          pathDatum[0].length > 0 ? (<button onClick={() => { document.getElementById('idd').showModal() }} className="button">
            {!loading && <DocumentPlusIcon />}
            {loading && <ArrowPathIcon className="loadingIcon" />}
          </button>) : (null)
        }


        <div>
          <dialog id="idd" className="dialog-form">
            <Contact
              loading={loading}
              onEnviar={recibirDatos}
              enviado={enviado}
              setEnviado={setEnviado}
            />
          </dialog>
        </div>




      </div>
    </div>
  );
}

export default Draw;
