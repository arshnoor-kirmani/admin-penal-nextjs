import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

// Connecting Database
export default async function dbConnect({
  Database_name,
}: {
  Database_name: string;
}): Promise<void> {
  if (
    connection.isConnected &&
    mongoose.connection.db?.databaseName === Database_name
  ) {
    console.log("Already connnected to Database");
    return;
  }

  try {
    const URL = `${process.env.MONGODB_URL}/${Database_name}?retryWrites=true&w=majority`;
    const Db = await mongoose.connect(URL || "", {});
    connection.isConnected = Db.connections[0].readyState;
    console.log("Database Connect Successfully");
  } catch (err) {
    console.log("Database Connection Failed", err);
    process.exit(1);
  }
}
