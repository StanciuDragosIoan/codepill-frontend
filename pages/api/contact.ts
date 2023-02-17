// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  msg?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, name, message } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim === "" ||
    !message ||
    message.trim() === ""
  ) {
    res.status(422).json({ msg: "invalid input" });
    return;
  }

  console.log(email, name, message);
  return res.status(200).json({ name: "John Doe" });
}
