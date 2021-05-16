import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const deckId = new ObjectId(req.body.deckId);

  if (req.body.action === "newCard") {
    await db
      .collection("decks")
      .updateOne(
        { _id: deckId },
        { $inc: { all_cards: 1, "review_info.new_cards": 1 } }
      );
  } else if (req.body.action === "newCardReviewed") {
    await db
      .collection("decks")
      .updateOne({ _id: deckId }, { $inc: { "review_info.new_cards": -1 } });
  } else if (req.body.action === "reviewsToday") {
    await db
      .collection("decks")
      .updateOne(
        { _id: deckId },
        { $set: { "review_info.cards_today": req.body.cardsToStudyLength } }
      );
  } else if (req.body.action === "repeatReview") {
    await db
      .collection("decks")
      .updateOne({ _id: deckId }, { $inc: { "review_info.repeat_cards": 1 } });
  } else if (req.body.action === "cardRepeatReviewed") {
    await db
      .collection("decks")
      .updateOne({ _id: deckId }, { $inc: { "review_info.repeat_cards": -1 } });
  }

  res.end();
};
