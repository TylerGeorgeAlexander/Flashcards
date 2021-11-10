import { Link } from "react-router-dom";

export default function NotEnoughCards({deckId, cardTotal, deckName}){
    return (
        <div>
            <h2>{deckName}: Study</h2>
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {cardTotal} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`}>
            <button class="btn btn-primary"><span class="oi oi-plus"></span> Add Cards</button>
            </Link>
        </div>
    );
}