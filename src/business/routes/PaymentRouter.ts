import { Router } from "express";
import paymentController from "../../controller/PaymentController";

export const paymentRouter = Router()

paymentRouter.post("/register", paymentController.registerPayment)
paymentRouter.get("/status", paymentController.selectPayment)

