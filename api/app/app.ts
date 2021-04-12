const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import { db } from './models/index'
import userRoutes from './routes/user.routes'
import recordRoutes from './routes/record.routes'
import reactionRoutes from './routes/reaction.routes'
export const app = express()


var corsOptions = {
    origin: "https://localhost:5000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
})

app.get("/", (req: any, res: any) => {
    console.log(req)
    res.json({ message: "Welcome to sokoban api"});
});

userRoutes(app)
recordRoutes(app)
reactionRoutes(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
