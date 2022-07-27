import { Request, Response } from "express";
import paymentBusiness, { PaymentBusiness } from "../business/PaymentBusiness";
import { InputPaymentCreditCardDTO, InputPaymentSlipDTO } from "../model/@types";

export class PaymentController {
  async registerPaymentCreditCard(req: Request, res: Response): Promise<void> {
    const input: InputPaymentCreditCardDTO = {
      client_id: req.body.client_id,
      buyer_name: req.body.buyer_name,
      buyer_email: req.body.buyer_email,
      buyer_cpf: req.body.buyer_cpf,
      payment_amount: req.body.payment_amount,
      payment_type: req.body.payment_type,
      card_holder_name: req.body.card_holder_name,
      card_number: req.body.card_number,
      card_expiration_date: req.body.card_expiration_date,
      card_cvv: req.body.card_cvv,
    };
    try {
      await paymentBusiness.paymentCardCredit(input);
      res.status(201).send({ message: "Pagamento registrado com sucesso" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
  async registerPaymentSlip(req: Request, res: Response): Promise<void> {
    const input: InputPaymentSlipDTO = {
      client_id: req.body.client_id,
      buyer_name: req.body.buyer_name,
      buyer_email: req.body.buyer_email,
      buyer_cpf: req.body.buyer_cpf,
      payment_amount: req.body.payment_amount,
      payment_type: req.body.payment_type,
    };
    try {
      const result = await paymentBusiness.paymentSlip(input);
      res.status(201).send({"Número do boleto":result});
    } catch (error:any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}

export default new PaymentController();

