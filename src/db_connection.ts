import mongoose from "mongoose";

const connect_with_db = async () => {
    try {
        const db_connection = await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        console.log("Connected to database");

        mongoose.connection.on("close", () => {
            console.log("Database connection closed");
        });

        return db_connection;
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export default connect_with_db;