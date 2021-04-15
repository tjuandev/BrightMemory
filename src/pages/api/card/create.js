import { parseISO } from "date-fns";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const stringToDate = parseISO(req.body.reviewWhen);

  await db
    .collection("cards")
    .insertOne({ ...req.body, reviewWhen: stringToDate });

  res.status(202);
  res.end();
};
