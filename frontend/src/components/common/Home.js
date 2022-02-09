import { useState, useEffect } from "react";
import jomato from "../images/jomato.png";
import food from "../images/main.jpg";
import Typography from "@mui/material/Typography";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {localStorage.getItem("status") === "1" ? (
        <div>Jomato mein Apka swagat H !!</div>
      ) : (
        <div>Jomato ~ Khana at your doorsteps</div>
      )}
      <img align="center" width="40%" src={food} alt="logo" />
    </div>
  );
};

export default Home;
