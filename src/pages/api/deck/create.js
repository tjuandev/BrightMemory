import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  await db
    .collection("bob")
    .find({})
    .toArray((err, result) => {
      if (err) {
        return console.log(err);
      }

      res.json(result);
    });
};
