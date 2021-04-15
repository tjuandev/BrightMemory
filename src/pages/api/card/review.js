import { connectToDatabase } from "../../../util/mongodb";
import { add, parseISO } from "date-fns";
import { ObjectId } from "bson";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const card = req.body.currentCard;
  const cardId = new ObjectId(card._id);

  const addDaysToReview = add(parseISO(card.reviewWhen), {
    days: req.body.daysToReview,
  });

  await db
    .collection("cards")
    .updateOne({ _id: cardId }, { $set: { reviewWhen: addDaysToReview } });

  res.status(204);
  res.end();
};
