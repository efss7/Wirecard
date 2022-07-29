import { PaymentData } from "../data/PaymentData";
import {
  InputPaymentDTO,
  PaymentCreditCardDB,
  PaymentSlipDB,
  PAYMENT_TYPE,
} from "../model/@types";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class PaymentBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private paymentData: PaymentData
  ) {}
  payment = async (input:InputPaymentDTO) =>{
    try {

      if(input.payment_type===PAYMENT_TYPE.CREDITCARD){
        return this.paymentCardCredit(input)
      }else{
        return this.paymentSlip(input)    
      }
    } catch (error) {
      
    }
  }
  paymentCardCredit = async (input: InputPaymentDTO) => {
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
      return {message:"Pagamento registrado com sucesso"}
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  
  paymentSlip = async (input: InputPaymentDTO) => {
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
      return {"Código de barras":codeBars} //colocar _ no lugar do espaço 
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
  selectPayment = async (id: string, payment_type:string) => {
    console.log(id, payment_type)
    try {
      if (!id || !payment_type) {
        throw new CustomError(422, "Parâmetros inválidos");
      }
      if(payment_type === PAYMENT_TYPE.CREDITCARD){
        return await this.paymentData.selectPaymentCreditCard(id);
      }else{
        return this.paymentData.selectPaymentSlip(id)
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new PaymentBusiness(new IdGenerator(), new PaymentData());
