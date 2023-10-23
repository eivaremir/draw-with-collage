import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './App.css'

import { getStroke } from 'perfect-freehand'


import { db } from "./db";
import { ref, set, child, get, onValue } from 'firebase/database';

import { Link } from "react-router-dom";
import {
  
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";
function Room() {
  const { t, id} = useParams()
  const [pictures, setPictures] = useState([
    []
  ]);
  const readPicture = () => {
    const dbRef = ref(db, '/rooms/id1/pictures');
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



    return (
      <span>hola</span>
    )
  };
  useEffect(() => {
    readPicture()
    console.log(id)
  }, [])
  return (
    <div>
      <div className="controls-up">
        <Link to="/">
          <button  className="button">
            <ArrowSmallLeftIcon />
          </button>
        </Link>
      </div>
      <svg width={collageWidth} height={collageHeight} xmlns="http:/wwww3org/2000/svg">
        {createSVGCollage()}
      </svg>
    </div>

  )
}

export default Room
