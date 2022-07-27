import { Router } from "express";
import paymentController from "../../controller/PaymentController";

export const paymentRouter = Router()

paymentRouter.post("/creditCard", paymentController.registerPaymentCreditCard)
paymentRouter.post("/slip", paymentController.registerPaymentSlip)
