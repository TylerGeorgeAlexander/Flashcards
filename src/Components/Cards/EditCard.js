import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [card, setCard] = useState({ front: "", back: "" });
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchMyAPI() {
      let deckResponse = await readDeck(deckId);
      setDeck(deckResponse);
      let response = await readCard(cardId);
      setCard(response);
    }
    fetchMyAPI();
  }, [deckId, cardId]);

  function viewDeckRedirect() {
    history.push(`/decks/${deckId}`);
  }

  async function editCardHandler(e) {
    e.preventDefault();
    // console.log("edit card", card);
    updateCard(card);
    viewDeckRedirect();
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
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <CardForm
        cardHandler={editCardHandler}
        card={card}
        setCard={setCard}
        viewDeckRedirect={viewDeckRedirect}
      />
    </div>
  );
}
