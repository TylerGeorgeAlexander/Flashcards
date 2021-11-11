import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

export default function HomeMap() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await listDecks();
      setDecks(response);
    }
    fetchMyAPI();
  }, []);

  const deleteHandler = async (deleteThisDeckId) => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      deleteDeck(deleteThisDeckId) 
      let response = await listDecks();
      setDecks(response);
    }
  };

  return decks.map((deck) => {
    return (
      <div className="card">
        <div className="card-body">
          <p className="float-right">{deck.cards.length} cards</p>
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-2">
              <span className="oi oi-eye"></span> View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary">
              <span className="oi oi-book"></span> Study
            </button>
          </Link>
          <button className="btn btn-danger float-right" onClick={()=>deleteHandler(deck.id)}>
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    );
  });
}
