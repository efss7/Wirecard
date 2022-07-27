import { Router } from "express";
import paymentBusiness from "../PaymentBusiness";

export const paymentRouter = Router()

paymentRouter.post("/creditCard", paymentBusiness.paymentCardCredit)
paymentRouter.post("/slip", paymentBusiness.paymentSlip)
