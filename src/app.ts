import express from 'express';
import connectDB from "./config/dbConn";
import truckRouter from "./routes/truckRoutes";

const app = express();

app.use(express.json());
app.use("/", truckRouter);

const port = 3000;

connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
    });

export default app;
