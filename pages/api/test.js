export default function handler(req, res) {
  const date = new Date();
  return res.status(200).json(date);
}
