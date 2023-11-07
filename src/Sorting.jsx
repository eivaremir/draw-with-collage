import { useState, useEffect } from "react";
import { ref, set, child, get, onValue } from "firebase/database";
import { db } from "./db";
const Sorting = () => {
  const [participants, setParticipants] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const readParticipants = () => {
    var roomId = 1;

    const pathRef = ref(db, "/participant/id1/contact");
    onValue(pathRef, (snapshot) => {
      const p = snapshot.val();

      if (p) setParticipants(Object.values(p));
      //setloading(false)
    });
  };
  function generateRandomNumber(iteration) {
    setStarted(true);
    setFinished(false)
    const maxDelay = 1000; // Maximum delay in milliseconds
    const delay = (1 / 150) * Math.pow(iteration, 2);

    setTimeout(
      () => {
        const randomNum = Math.floor(Math.random() * participants.length); //Math.floor(Math.random() * 100); // Change 100 to your desired range
        console.log(
          `${delay} Iteration ${iteration}: Random Number = ${randomNum}`
        );
        document.getElementById("name").innerText =
          participants[randomNum].nombre;
        document.getElementById("contacto").innerText =
          participants[randomNum].contacto;
        if (iteration < 150) {
          generateRandomNumber(iteration + 1);
        } else {
          setFinished(true);
        }
      },
      delay < 0 ? 0 : delay
    ); // Ensure delay is non-negative
  }

  //generateRandomNumber(1);
  useEffect(() => {
    readParticipants();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!started && (
        <>
          <button onClick={() => generateRandomNumber(1)} style={{
                border: "1px solid #d9d9d9",
                background: "white",
                padding: "7px 10px",
                borderRadius: "10px",
                cursor: "pointer",
                display: 'flex',
                gap: "7px",
                justifyContent: "center"
              }}>
            Empezar sorteo
          </button>
        </>
      )}
      {started && (
        <>
          {finished && (
            <h1 style={{ fontSize: "4em", margin: " 19px 0" }}>Felicidades</h1>
          )}
          <h1 id="name" style={{ color: finished ? "green" : "black " }}></h1>
          <h2
            id="contacto"
            style={{ color: finished ? "green" : "black " }}
          ></h2>
          {finished && (
             <button onClick={() => generateRandomNumber(1)} style={{
                border: "1px solid #d9d9d9",
                background: "white",
                padding: "7px 10px",
                borderRadius: "10px",
                cursor: "pointer",
                display: 'flex',
                gap: "7px",
                justifyContent: "center",
                margin: "20px 0"
              }}>
             Empezar de nuevo
           </button>
          )}
        </>
      )}
    </div>
  );
};
export default Sorting;
