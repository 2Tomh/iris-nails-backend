const express = require("express");
const cors = require("cors");

const app = express();


const port = process.env.PORT;

require("./db/mongoose");

app.use(cors());
app.use(express.json());
const authRouter = require("./routers/auth");
const appointmentRouter = require("./routers/appointments");
const productsRouter = require("./routers/products");
const purchasesRouter = require("./routers/purchase");

app.use(authRouter);
app.use(appointmentRouter);
app.use(productsRouter);
app.use(purchasesRouter);


app.listen(port, () => {
    console.log("Server running: ", port);
})