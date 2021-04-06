import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();

    const allDecks = await db.collection("decks").find({}).toArray();

    res.json(allDecks);
    res.end();
  }
};
