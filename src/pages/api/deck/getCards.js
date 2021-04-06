import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let deckId = new ObjectId(req.body.id);

  const deck = await db.collection("decks").find({ _id: deckId }).toArray();

  res.json(deck);
  res.end();
};
