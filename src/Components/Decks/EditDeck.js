import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api"

export default function EditDecks(){
    // constructing a deck using useState
    const [deck, setDeck] = useState({});
    // example of a variable to set the form input value equal to
    const [deckName, setDeckName] = useState("");
    // deckId could be the name of the deck we need to read
    const deckId = "This would probably be an object/array passed with Edit Decks props"

    useEffect(() => {
        readDeck(deckId).then(data => setDeck(deck));
    }, []);


    // breadcrumbs is the greyed out navigation box in the app, look into bootstrap for more references
    return (
        <div>
            <div className="breadcrumbs"></div>
            <header></header>
            {/* <Link to={"/"}>Something</Link> */}
            <form>
                <input type="" name="" id="" value={deckName} onChange={(event => setDeckName(event.target.value))} />
            </form>
        </div>
    )
}
