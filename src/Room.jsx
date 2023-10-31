import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './App.css'

import { getStroke } from 'perfect-freehand'


import { db } from "./db";
import { ref, set, child, get, onValue } from 'firebase/database';
import Cell from './Row'
import { Link } from "react-router-dom";
import {

  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";



function Room() {
  const { t, id } = useParams()
  const [pictures, setPictures] = useState([
    []
  ]);
  const readPicture = () => {
    var roomId = 1
    const dbRef = ref(db, '/rooms/id' + roomId + '/pictures');
    // get(child(dbRef, '/rooms/id1/pictures')).then((snapshot) => {
    //   {
    //     const data = snapshot.val();
    //     setPictures(data)
    //     //console.log("Datos leídos:", data);
    //   }
    // })
    var resultado = [];

    onValue(dbRef, (snapshot) => {

      const data = snapshot.val();
      console.log("data", data);
      if (data) setPictures(Object.values(data))
    });
  }
  const collageWidth = 800; // Adjust as needed
  const collageHeight = 600; // Adjust as needed
  const generateRandomPlacement = () => {
    const x = Math.random() * 100;
    const y = (Math.random() * 100) / 2;
    const scale = Math.random(); // Random width between 50 and 150

    return { x, y, scale };
  };

  const createTable = (arr) => {
    var arr2 = []
    let wid, lastWid
    //let numImage = arr.length

    for (let i = 0; i < arr.length; i++) { //a.length

      const max = 100 / (Math.ceil(Math.sqrt(arr.length)))
      do { wid = Math.round(Math.random() * 100, 0) } while ((wid < 10) || (wid > max))

      if (i % 2 != 0) {
        wid = (max - lastWid) + max
      } else {
        lastWid = wid
      }

      arr2[i] = Cell(arr[i], wid)

    }

    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100vw"
      }}>
        {(arr2)}
      </div>
    );
  };

  const createCollageStructure = (arr) => {
    var x = 0
    var arr2d = []
    for (var i = 0; i < Math.floor(Math.sqrt(arr.length)); i++) {
      arr2d.push([]);
      console.log("Iteración 1i", i, "sqrt", Math.floor(Math.sqrt(arr.length)))
      console.log("Round /2", arr.length / 2)
      for (var j = 0; j <= (arr.length / 2); j++) { //Math.round(arr.length / 2)
        if (x < arr.length) {
          console.log("Valor x", x)
          arr2d[i].push(arr[x])
          x++
          console.log("Iteración j", j, "div", arr.length / 2)
          console.log("Arreglo 2d: ", arr2d[i])
        }
      }
    }

    return (arr2d);
  }

  const createSVGCollage = () => {
    // return pictures.map((p, pi) => {
    //   const { x, y, scale } = generateRandomPlacement();
    //   return (

    //     <svg key={'pi' + pi} style={{
    //       scale: `${scale}`,
    //       transform: `translate(${x}%,${y}%)`
    //     }}>

    //       {
    //         p.map((path, i) => (
    //           <path key={'pi' + pi + 'p' + i} d={path} />
    //         ))
    //       }

    //     </svg>

    //   );
    // });


    //return función dado svg[[]]
    return createTable(pictures);
  }
  useEffect(() => {
    readPicture()
    console.log(id)
  }, [])
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

    }}>
      <div className="controls-up">
        <Link to="/">
          <button className="button">
            <ArrowSmallLeftIcon />
          </button>
        </Link>
      </div>
      {/* <svg width={collageWidth} height={collageHeight} xmlns="http:/wwww3org/2000/svg">

      </svg> */}
      {createSVGCollage()}
    </div>

  )
}

export default Room
