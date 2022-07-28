import { PaymentData } from "../data/PaymentData";
import {
  InputPaymentCreditCardDTO,
  InputPaymentSlipDTO,
  PaymentCreditCardDB,
  PaymentSlipDB,
} from "../model/@types";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class PaymentBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private paymentData: PaymentData
  ) {}

  paymentCardCredit = async (input: InputPaymentCreditCardDTO) => {
    try {
      const {
        client_id,
        buyer_name,
        buyer_email,
        buyer_cpf,
        payment_amount,
        payment_type,
        card_holder_name,
        card_number,
        card_expiration_date,
        card_cvv,
      } = input;
      if (!buyer_name || !buyer_email || !buyer_cpf) {
        throw new CustomError(422, "Comprador inválido");
      }
      if (!payment_amount || !payment_type) {
        throw new CustomError(422, "Dados de pagamento inválidos");
      }
      if (
        !card_holder_name ||
        !card_number ||
        !card_expiration_date ||
        !card_cvv
      ) {
        throw new CustomError(422, "Cartão de crédito inválido");
      }
      const id = this.idGenerator.generateId();
      const payment: PaymentCreditCardDB = {
        id,
        client_id,
        buyer_name,
        buyer_email,
        buyer_cpf,
        payment_amount,
        payment_type,
        card_holder_name,
        card_number,
        card_expiration_date,
        card_cvv,
      };
      await this.paymentData.insertPaymentCard(payment);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  private codeBars = (code: number) => {
    return Math.floor(Math.random() * code);
  };
  private slipNumber = () => {
    const numbers = "0123456789";
    let codeBars = "";
    for (let i = 0; i <= 47; i++) {
      const index = Math.floor(this.codeBars(numbers.length - 1));
      codeBars += numbers[index];
    }
    return codeBars;
  };
  paymentSlip = async (input: InputPaymentSlipDTO) => {
    try {
      const {
        client_id,
        buyer_name,
        buyer_email,
        buyer_cpf,
        payment_amount,
        payment_type,
      } = input;
      if (!buyer_name || !buyer_email || !buyer_cpf) {
        throw new CustomError(422, "Comprador inválido");
      }
      if (!payment_amount || !payment_type) {
        throw new CustomError(422, "Dados de pagamento inválidos");
      }
      const id = this.idGenerator.generateId();
      const payment: PaymentSlipDB = {
        id,
        client_id,
        buyer_name,
        buyer_email,
        buyer_cpf,
        payment_amount,
        payment_type,
        slipNumber: this.slipNumber(),
      };
      await this.paymentData.insertPaymentSlip(payment);
      const codeBars = payment.slipNumber;
      return codeBars;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  selectPaymentCreditCard = async (id: string) => {
    try {
      if (!id) {
        throw new CustomError(422, "Id inválido");
      }
      const result = await this.paymentData.selectPaymentCreditCard(id);
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  selectPaymentSlip = async (id: string) => {
    try {
      if (!id) {
        throw new CustomError(422, "Id inválido");
      }
      const result = await this.paymentData.selectPaymentSlip(id);
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new PaymentBusiness(new IdGenerator(), new PaymentData());
