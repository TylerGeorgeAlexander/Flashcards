import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api";

export default function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    await createDeck(deck);
    let newDecks = await listDecks();
    history.push(()=>`/decks/${newDecks.length}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={submitHandler}>
        <label className="mt-2">Name</label>
        <input
          type="text"
          name="text"
          id="name"
          value={deck.name}
          style={{ width: "100%" }}
          required
          placeholder="Deck Name"
          onChange={(event) =>
            setDeck({ ...deck, [event.target.id]: event.target.value })
          }
        />
        <label className="mt-2">Description</label>
        <textarea
          type="text"
          name="text"
          id="description"
          value={deck.description}
          style={{ width: "100%" }}
          required
          placeholder="Brief description of the deck"
          onChange={(event) =>
            setDeck({ ...deck, [event.target.id]: event.target.value })
          }
        />
        <Link to="/">
          <button className="btn btn-secondary mr-2 mt-2">Cancel</button>
        </Link>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
