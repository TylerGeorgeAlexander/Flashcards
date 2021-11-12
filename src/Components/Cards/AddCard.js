import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";

export default function AddCard() {
  const [deck, setDeck] = useState([{ name: "ph", description: "ph" }]);

  const { deckId } = useParams();
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readDeck(deckId);
      setDeck(response);
    }
    fetchMyAPI();
  }, [deckId]);

  function doneRedirect() {
    history.push(`/decks/${deckId}`);
  }

  async function addCardHandler(e) {
    e.preventDefault();
    console.log("addCardHandler", card);
    await createCard(deckId, card);
    setCard({ front: "", back: "" })
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span class="oi oi-home"></span> Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <p class="mt-2">Front</p>
      <form onSubmit={addCardHandler}>
        <textarea
          type="textarea"
          name="text"
          id="front"
          required
          placeholder="Front side of card"
          value={card.front}
          onChange={(event) =>
            setCard({ ...card, [event.target.id]: event.target.value })
          }
        />
        <p class="mt-2">Back</p>
        <textarea
          type="textarea"
          name="textarea"
          id="back"
          required
          placeholder="Back side of card"
          value={card.back}
          onChange={(event) =>
            setCard({ ...card, [event.target.id]: event.target.value })
          }
        />
        <button
          class="btn btn-secondary mr-2 mt-2"
          onClick={() => doneRedirect}
        >
          Done
        </button>
        <button class="btn btn-primary mt-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
