import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  await db.collection("cards").deleteMany({ deckId: req.body.deckId });

  res.status(202);
  res.end();
};
