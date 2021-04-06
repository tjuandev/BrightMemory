import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  await db.collection("decks").insertOne({ ...req.body });

  res.status(200);
  res.end();
};
