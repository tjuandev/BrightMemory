import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const deckId = new ObjectId(req.body.deckId);

  console.log(req.body.action);

  if (req.body.action === "newCard") {
    await db
      .collection("decks")
      .updateOne(
        { _id: deckId },
        { $inc: { all_cards: 1, "review_info.new_cards": 1 } }
      );
  }
  res.end();
};
