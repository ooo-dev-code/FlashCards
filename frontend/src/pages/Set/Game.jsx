import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/Game.css";

function Game() {
  const { id } = useParams();
  const [set, setSet] = useState({});

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/set/" + id)
      .then((response) => {
        setSet(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  return (
    <div className="game-container">
      <h2>Cards in Set: {set.name}</h2>

      <div className="card">
        {answer === false ? (
          <p>{set.cards && set.cards[index].recto}</p>
        ) : (
          <p>{set.cards && set.cards[index].verso}</p>
        )}
      </div>

      <button onClick={() => setAnswer(!answer)}>
        {answer === false ? "Show Answer" : "Show Question"}
      </button>

      {set.cards && index >= set.cards.length - 1 ? (
        <button onClick={() => setIndex(0)}>First Card</button>
      ) : (
        <button
          onClick={() => {
            setIndex(index + 1);
            setAnswer(false);
          }}
        >
          Next Card
        </button>
      )}

      {set.cards && index <= 0 ? (
        <button onClick={() => setIndex(set.cards.length - 1)}>
          Last Card
        </button>
      ) : (
        <button
          onClick={() => {
            setIndex(index - 1);
            setAnswer(false);
          }}
        >
          Previous Card
        </button>
      )}

      <a href="/addset">Home</a>
    </div>
  );
}

export default Game;
