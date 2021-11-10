import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, listDecks } from "../../utils/api";

export default function EditDecks() {
  // constructing a deck using useState
  const [deck, setDeck] = useState([{ name: "ph", description: "ph" }]);
  // example of a variable to set the form input value equal to
  const [deckName, setDeckName] = useState("");
  const [deckDesc, setDeckDesc] = useState("");
  // deckId could be the name of the deck we need to read
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readDeck(deckId);
      setDeck(response);
    }
    fetchMyAPI();
  }, [deckId]);

  console.log(deck);
  // setDeckName(deck[deckId].name)
  // setDeckDesc(deck[deckId].description)

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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form>
        <label class="mt-2">Name</label>

        <textarea
          type="text"
          name="text"
          id="text"
          style={{ width: "100%" }}
          required
          value={deck.name}
          onChange={(event) => setDeckName(event.target.value)}
        />

        <label class="mt-2">Description</label>

        <textarea
          type="text"
          name="text"
          id="text"
          style={{ width: "100%" }}
          required
          value={deck.description}
          onChange={(event) => setDeckName(event.target.value)}
        />

        <button class="btn btn-secondary mr-2 mt-2">Cancel</button>
        <button class="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
