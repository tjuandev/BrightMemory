import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let deckId = new ObjectId(req.body.id);

  const deck = await db.collection("decks").find({ _id: deckId }).toArray();
  let newCard = [
    ...deck[0].cards,
    { front: req.body.front, back: req.body.back },
  ];

  console.log(newCard);

  await db.collection("decks").updateOne(
    { _id: deckId },
    {
      $set: {
        cards: newCard,
      },
    }
  );

  res.status(202);
  res.end();
};
