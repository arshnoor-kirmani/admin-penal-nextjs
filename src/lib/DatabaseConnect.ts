import mongoose from "mongoose";

export type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

// Connecting Database
export default async function dbConnect(
  Database_name: string
): Promise<ConnectionObject> {
  if (
    mongoose.connection.readyState === 1 &&
    mongoose.connection.db?.databaseName === Database_name
  ) {
    console.log("Already connected to Database");
    connection.isConnected = mongoose.connection.readyState;
    return connection;
  } else if (
    mongoose.connection.readyState === 1 &&
    mongoose.connection.db?.databaseName !== String(Database_name)
  ) {
    console.log(
      `Closing previous connection to ${mongoose.connection.db?.databaseName}.......`
    );
    await mongoose.connection
      .close()
      .then(() => console.log("Database closed"));
  }

  try {
    const URL = `${process.env.MONGODB_URL}/${Database_name}?retryWrites=true&w=majority`;
    const Db = await mongoose.connect(URL || "", { maxPoolSize: 10 });
    connection.isConnected = Db.connections[0].readyState;
    console.log("Database Connect Successfully");
  } catch (err) {
    console.log("Database Connection Failed", err);
    process.exit(1);
  }
  return connection;
}
