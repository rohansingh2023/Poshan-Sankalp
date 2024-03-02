import dbConnect from "../../../util/mongo";
import Doctor from "../../../models/Doctor";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const doctors = await Doctor.create(req.body);
      res.status(201).json(doctors);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
