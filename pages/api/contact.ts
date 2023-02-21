// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient } = require("mongodb");

type MsgType = {
  id?: string;
  email: string;
  name: string;
  message: string;
};

type Data = {
  name?: string;
  msg?: string;
  userMessage?: MsgType;
};

const validateInput = (email: string, message: string, name: string) => {
  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name === "" ||
    !message ||
    message.trim() === ""
  ) {
    return false;
  }

  return true;
};

const getDbClient = async () => {
  let client = null;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.e4lg5.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`
    );
  } catch (err) {
    return client;
  }

  return client;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    const isValid = validateInput(email, message, name);
    if (!isValid) {
      res.status(422).json({ msg: "invalid input" });
    }

    const newMessage: MsgType = {
      email,
      name,
      message,
    };

    const client = await getDbClient();

    if (!client) {
      res.status(500).json({ msg: "db connection failed.." });
    }

    const db = client.db();

    try {
      const result = await db.collection("UserMessages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ msg: "save in db saved" });
      return;
    }

    client.close();

    res.status(201).json({
      msg: "Successfully stored message!",
      userMessage: newMessage,
    });
  } else {
    res.status(400).json({
      msg: "we do not support this type of request atm",
    });
  }
}
