import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function AddCard() {
  const [deck, setDeck] = useState([{name:"ph", description:"ph"}]);
  const [deckName, setDeckName] = useState("");
  const { deckId } = useParams();


  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readDeck(deckId);
      setDeck(response);
    }
    fetchMyAPI();
    
  }, [deckId]);


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
      <h2>{deckName}{deck.name}: Add Card</h2>
        <p class="mt-2">Front</p>
      <form>
        <textarea
          type="textarea"
          name="text"
          id="text"
          required
          value="Front side of card ph"
          onChange={(event) => setDeckName(event.target.value)}
        />
      </form>
      <p class="mt-2">Back</p>
      <form>
        <textarea
          type="textarea"
          name="textarea"
          id="textarea"
          required
          value="Back side of card ph"
          onChange={(event) => setDeckName(event.target.value)}
        />
      </form>
      <button class="btn btn-secondary mr-2 mt-2">Done</button>
      <button class="btn btn-primary mt-2" type="submit">Save</button>
    </div>
  );
}
