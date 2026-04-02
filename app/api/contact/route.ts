import { NextRequest, NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

type MsgType = {
  id?: string;
  email: string;
  name: string;
  message: string;
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

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const isValid = validateInput(email, message, name);
  if (!isValid) {
    return NextResponse.json({ msg: "invalid input" }, { status: 422 });
  }

  const newMessage: MsgType = { email, name, message };

  const client = await getDbClient();
  if (!client) {
    return NextResponse.json({ msg: "db connection failed.." }, { status: 500 });
  }

  const db = client.db();
  try {
    const result = await db.collection("UserMessages").insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (err) {
    client.close();
    return NextResponse.json({ msg: "save in db failed" }, { status: 500 });
  }

  client.close();
  return NextResponse.json(
    { msg: "Successfully stored message!", userMessage: newMessage },
    { status: 201 }
  );
}
