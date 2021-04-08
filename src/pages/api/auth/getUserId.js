import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .find({ email: req.body.email })
    .toArray();

  res.json(user[0]._id);
  res.end();
};
