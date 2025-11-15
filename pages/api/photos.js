import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        const photos = await Photo.find({}).sort({ createdAt: -1 }).lean();
        return res.status(200).json(photos);
      }
      default:
        return res.setHeader("Allow", ["GET"]).status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error", details: err?.message });
  }
}
