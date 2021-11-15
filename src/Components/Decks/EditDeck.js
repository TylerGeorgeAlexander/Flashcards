import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function EditDecks() {
  // constructing a deck using useState
  const [deck, setDeck] = useState({ name: "", description: "" });
  // deckId could be the name of the deck we need to read
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await readDeck(deckId);
      setDeck(response);
    }
    fetchMyAPI();
  }, [deckId]);

  async function editDeckHandler(e) {
    e.preventDefault();
    // console.log("edit deck", deck);
    updateDeck(deck);
    viewDeckRedirect();
  }

  function viewDeckRedirect() {
    history.push(`/decks/${deckId}`);
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={editDeckHandler}>
        <label className="mt-2">Name</label>

        <textarea
          type="text"
          name="text"
          id="name"
          style={{ width: "100%" }}
          required
          value={deck.name}
          onChange={(event) =>
            setDeck({ ...deck, [event.target.id]: event.target.value })
          }
        />

        <label className="mt-2">Description</label>

        <textarea
          type="text"
          name="text"
          id="description"
          style={{ width: "100%" }}
          required
          value={deck.description}
          onChange={(event) =>
            setDeck({ ...deck, [event.target.id]: event.target.value })
          }
        />

        <button className="btn btn-secondary mr-2 mt-2" onClick={viewDeckRedirect}>Cancel</button>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
