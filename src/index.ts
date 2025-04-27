import app from "./app";
import connect_with_db from "./db_connection";

connect_with_db().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});