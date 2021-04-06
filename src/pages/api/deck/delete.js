import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let deckId = new ObjectId(req.body.id);

  await db.collection("decks").findOneAndDelete({ _id: deckId });

  res.status(202);
  res.end();
};
