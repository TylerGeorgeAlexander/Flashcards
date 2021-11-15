export default function CardForm({
  cardHandler,
  card,
  setCard,
  viewDeckRedirect,
}) {
  return (
    <form onSubmit={cardHandler}>
      <textarea
        type="textarea"
        name="text"
        id="front"
        required
        placeholder="Front side of card"
        value={card.front}
        onChange={(event) =>
          setCard({ ...card, [event.target.id]: event.target.value })
        }
      />
      <p className="mt-2">Back</p>
      <textarea
        type="textarea"
        name="textarea"
        id="back"
        required
        placeholder="Back side of card"
        value={card.back}
        onChange={(event) =>
          setCard({ ...card, [event.target.id]: event.target.value })
        }
      />
      <button
        className="btn btn-secondary mr-2 mt-2"
        onClick={viewDeckRedirect}
      >
        Done
      </button>
      <button className="btn btn-primary mt-2" type="submit">
        Save
      </button>
    </form>
  );
}
