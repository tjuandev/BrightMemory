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

  if (!req.body.repeat && !req.body.isNotToRepeat) {
    // NOTE Not working now
    await db.collection("cards").updateOne(
      { _id: cardId },
      {
        $set: { reviewWhen: addDaysToReview, isNew: false },
        $inc: { reviewTime: 1 },
      }
    );
  } else if (!req.body.repeat && req.body.isNotToRepeat) {
    await db.collection("cards").updateOne(
      { _id: cardId },
      {
        $set: {
          reviewWhen: addDaysToReview,
          isNew: false,
          isRepeat: false,
        },
        $inc: {
          reviewTime: 1,
        },
      }
    );
  } else {
    await db.collection("cards").updateOne(
      { _id: cardId },
      {
        $set: {
          reviewWhen: addDaysToReview,
          isNew: false,
          reviewTime: 2,
          isRepeat: true,
        },
      }
    );
  }

  res.status(204);
  res.end();
};
