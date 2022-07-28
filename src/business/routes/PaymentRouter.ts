import { Router } from "express";
import paymentController from "../../controller/PaymentController";

export const paymentRouter = Router()

paymentRouter.post("/creditCard", paymentController.registerPaymentCreditCard)
paymentRouter.post("/slip", paymentController.registerPaymentSlip)

paymentRouter.get("/byCreditCard/:id", paymentController.selectPaymentCreditCard)
paymentRouter.get("/bySlip/:id", paymentController.selectPaymentSlip )
