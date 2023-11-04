import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './App.css'

import { getStroke } from 'perfect-freehand'

import ImageContainer from './ImageContainer';
import Image from './Image';
import { db } from "./db";
import { ref, set, child, get, onValue } from 'firebase/database';
import Cell from './Row'
import { Link } from "react-router-dom";
import {
  ArrowPathIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/outline";


const getWidth = (n)=>100 / (Math.ceil(Math.sqrt(n)))

function Room() {
  const { t, id } = useParams()
  const [pictures, setPictures] = useState([
    []
  ]);
  const [colors, setColors] = useState([
    []
  ]);
  const [collagePlan, setCollagePlan] = useState([
    []
  ]);
  const [loading, setloading] = useState(true);
  const [cloading, setcloading] = useState(true);

  const readPicture = () => {
    var roomId = 1

    const pathRef = ref(db, '/rooms/id' + roomId + '/pictures');
    onValue(pathRef, (snapshot) => {
      const pathData = snapshot.val();
      
      if (pathData) setPictures(Object.values(pathData))
      setloading(false)
    });

  }

  const readColor = () => {
    var roomId = 1

    const colorRef = ref(db, '/rooms/id' + roomId + '/color');
    onValue(colorRef, (snapshot) => {
      const colorData = snapshot.val();
      
      if (colorData) setColors(Object.values(colorData))
      setcloading(false)
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

  const createTable = (pathArr, colorArr) => {
    var pathArr2 = []
    let wid, lastWid
    //let numImage = pathArr.length

    for (let i = 0; i < pathArr.length; i++) { //a.length

      const max = 100 / (Math.ceil(Math.sqrt(pathArr.length)))
      do { wid = Math.round(Math.random() * 100, 0) } while ((wid < 10) || (wid > max))

      if (i % 2 != 0) {
        wid = (max - lastWid) + max
      } else {
        lastWid = wid
      }


      pathArr2[i] = Cell(pathArr[i], wid, colorArr[i])

    }

    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100vw"
      }}>
        {(pathArr2)}
      </div>
    );
  };

  const createCollageStructure = (arr) => {
    var x = 0
    var arr2d = []
    for (var i = 0; i < Math.floor(Math.sqrt(arr.length)); i++) {
      arr2d.push([]);
      
      
      for (var j = 0; j <= (arr.length / 2); j++) { //Math.round(arr.length / 2)
        if (x < arr.length) {
          
          arr2d[i].push(arr[x])
          x++
          
          
        }
      }
    }

    return (arr2d);
  }

  const createSVGCollage = () => {

    //return función dado svg[[]]
    return createTable(pictures, colors);
  }
  useEffect(() => {
    readPicture()
    readColor()
    
  }, [])

  useEffect(()=>{
    let arr = pictures.map((_,i)=> i)
    let arr2 = []
    
    for(let a = 0; a<arr.length; a++){
        let randomValue = Math.random();
        let result = randomValue < 0.5 ? 1 : 4;
        let subarr = []
        for(let b = a; b< a+result; b++) {
          // if (pictures[b])
          subarr.push(arr[b])
        }
        arr2.push(subarr)
        a+=result-1
    }
    setCollagePlan(arr2)
  },pictures)
  return (
    <div style={{
      
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap:'wrap',
      width: "75%"
    }}>
      <div className="controls-up">
        <Link to="/">
          <button className="button">
            <ArrowSmallLeftIcon />
          </button>
        </Link>
      </div>

      {(loading || cloading) && <ArrowPathIcon style={{width:"10%"}} className="loadingIcon" />}


      {
        !(loading || cloading) && collagePlan.map((pics)=>{

          let basis = pics.length > 1 ? 50 : 100
          return (
            <ImageContainer key={"container"+pics} width={getWidth(collagePlan.length)+"%"}>
              {
                pics.map(p =>  <Image key={"picure"+p} basis={basis} pathDatum={pictures[p]} pathColors={colors[p]}/>)
              }
            </ImageContainer>
          )
        })
      }






    </div>

  )
}

export default Room
