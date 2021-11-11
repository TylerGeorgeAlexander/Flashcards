import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";

export default function ViewDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    // readDeck(deckId).then(setCards);
  }, [deckId]);

  const deleteDeckHandler = () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      console.log("Delete deck PH");
    }
  };
  const deleteCardHandler = () => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      console.log("Delete card PH");
    }
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`}>
          <button className="btn btn-secondary mr-2">
            <span className="oi oi-pencil"></span> Edit
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="btn btn-primary mr-2">
            <span className="oi oi-book"></span> Study
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary mr-2">
            <span className="oi oi-plus"></span> Add Cards
          </button>
        </Link>

        <button className="btn btn-danger float-right" onClick={deleteDeckHandler}>
          <span className="oi oi-trash"></span>
        </button>
      </div>
      <div className="mt-4 mb-4">
        <h2>Cards</h2>
        {deck.cards.map((card) => (
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <p className="card-text">{card.front}</p>
                </div>
                <div className="col">
                  <p className="card-text">{card.back}</p>
                </div>
              </div>
              <button
                className="btn btn-danger float-right"
                onClick={deleteCardHandler}
              >
                <span className="oi oi-trash"></span>
              </button>
              <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary mr-2 float-right">
                  <span className="oi oi-pencil"></span> Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
