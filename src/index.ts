import { app } from "./controller/app";

import express from "express";
import cors from "cors";
import { paymentRouter } from "./business/routes/PaymentRouter";

app.use(express.json())
app.use(cors())

app.use("/payment", paymentRouter)

