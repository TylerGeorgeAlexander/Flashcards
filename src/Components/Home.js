import HomeMap from "./HomeMap";
import { Link } from "react-router-dom";

export default function Home() {

// Created HomeMap to organize html return a bit

// Example of .then instead of async
// function loadDecks() {
//   listDecks().then(setDecks)
// }
//   useEffect(()=> {
//     loadDecks();
//   }, []);

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/decks/new">
              <button className="btn btn-secondary mb-2">
                <span className="oi oi-plus"></span> Create Deck
              </button>
            </Link>
            <HomeMap />
          </div>
        </div>
      </div>
    );

}
