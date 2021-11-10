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
      <div class="container">
        <div class="row">
          <div class="col">
            <Link to="/decks/new">
              <button class="btn btn-secondary mb-2">
                <span class="oi oi-plus"></span> Create Deck
              </button>
            </Link>
            <HomeMap />
          </div>
        </div>
      </div>
    );

}
