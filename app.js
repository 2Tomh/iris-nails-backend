const express = require("express");
const cors = require("cors");

const app = express();


const port = process.env.PORT;

require("./db/mongoose");

app.use(cors());
app.use(express.json());
const authRouter = require("./routers/auth");
const appointmentRouter = require("./routers/appointments");

app.use(authRouter);
app.use(appointmentRouter);

app.listen(port, () => {
    console.log("Server running: ", port);
})