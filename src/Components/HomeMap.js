import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";

export default function HomeMap() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await listDecks();
      setDecks(response);
    }
    fetchMyAPI();
  }, []);

  const deleteHandler = () => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      console.log("Delete PH")
    }
  };

  return decks.map((deck) => {
    return (
      <div class="card">
        <div class="card-body">
          <p class="float-right">{deck.cards.length} cards</p>
          <h5 class="card-title">{deck.name}</h5>
          <p class="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}`}>
            <button class="btn btn-secondary mr-2">
              <span class="oi oi-eye"></span> View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button class="btn btn-primary">
              <span class="oi oi-book"></span> Study
            </button>
          </Link>
          <button class="btn btn-danger float-right" onClick={deleteHandler}>
            <span class="oi oi-trash"></span>
          </button>
        </div>
      </div>
    );
  });
}
