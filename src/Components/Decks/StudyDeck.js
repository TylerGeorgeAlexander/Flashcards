import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "../NotEnoughCards";

export default function StudyDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flip, setFlip] = useState("front");
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const flipHandler = async () => {
    flip === "front" ? setFlip("back") : setFlip("front");
  };

  const nextHandler = async () => {
    setCurrentCardIndex(() => currentCardIndex + 1);
    flip === "front" ? setFlip("back") : setFlip("front");
    if (currentCardIndex + 1 === deck.cards.length && flip === "back") {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setCurrentCardIndex(0);
        setFlip("front");
      } else {
        history.push("/");
      }
    }
  };

  // Used to block null / undefined rendering, but unsure if still needed.
  // if (!deck.cards.length) {
  //   return "Loading ....";
  // }

  if (deck.cards.length < 3) {
    const cardTotal = deck.cards.length;
    const deckName = deck.name;
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
        <NotEnoughCards
          deckId={deckId}
          cardTotal={cardTotal}
          deckName={deckName}
        />
      </div>
    );
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
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{deck.cards[currentCardIndex][flip]}</p>
          <button className="btn btn-secondary mr-2" onClick={flipHandler}>
            Flip
          </button>
          {flip === "back" && (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
