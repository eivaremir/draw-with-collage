import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          maxWidth: "300px",
        }}
        src="ss.jpg"
      />
      <h2>Selecciona una opcion</h2>
      <div
        style={{
          display: "flex",
          gap: "3px",
          margin: "15px 0px",
        }}
      >
        {[1, 2, 3].map((room) => (
          <Link to={`room/${room}`} key={"r" + room}>
            <button
              style={{
                border: "1px solid #d9d9d9",
                background: "white",
                padding: "7px 10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Room {room}
            </button>
          </Link>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "3px",
          margin: "15px 0px",
        }}
      >
        {[1, 2, 3].map((room) => (
          <Link to={`draw/${room}`} key={"d" + room}>
            <button
              style={{
                border: "1px solid #d9d9d9",
                background: "white",
                padding: "7px 10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              key={"r" + room}
            >
              Draw {room}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
