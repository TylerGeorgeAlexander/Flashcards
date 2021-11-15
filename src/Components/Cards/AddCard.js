import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const [deck, setDeck] = useState([{ name: "ph", description: "ph" }]);
  const [card, setCard] = useState({ front: "", back: "" });
  const { deckId } = useParams();

  const history = useHistory();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readDeck(deckId);
      setDeck(response);
    }
    fetchMyAPI();
  }, [deckId]);

  function viewDeckRedirect() {
    history.push(`/decks/${deckId}`);
  }

  async function addCardHandler(e) {
    e.preventDefault();
    console.log("addCardHandler", card);
    await createCard(deckId, card);
    setCard({ front: "", back: "" });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <p className="mt-2">Front</p>
      <CardForm
        cardHandler={addCardHandler}
        card={card}
        setCard={setCard}
        viewDeckRedirect={viewDeckRedirect}
      />
    </div>
  );
}
