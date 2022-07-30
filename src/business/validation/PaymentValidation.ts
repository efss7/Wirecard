import { CreatePaymentDTO, InputPaymentDTO, PAYMENT_TYPE, selectPaymentDTO } from "../../model/@types";
import { CustomError } from "../errors/CustomError";

export class PaymentValidation {
  createPayment(input: InputPaymentDTO) {
    this.client_id(input.client_id);
    this.buyer_name(input.buyer_name);
    this.buyer_email(input.buyer_email);
    this.buyer_cpf(input.buyer_cpf);
    this.payment_amount(input.payment_amount);
    this.payment_type(input.payment_type.toUpperCase());
    this.CreditCard(
      input.payment_type.toUpperCase(),
      input.card_holder_name,
      input.card_number,
      input.card_expiration_date,
      input.card_cvv
    );
  }
  selectPayment(input: selectPaymentDTO) {
    this.id(input.id)
    this.payment_type(input.payment_type)
  }

  private client_id = (client_id: string) => {
    if (!client_id || typeof client_id !== "string") {
      throw new CustomError(422, "Id inválido");
    }
  };
  private buyer_name = (buyer_name: string) => {
    if (!buyer_name || typeof buyer_name !== "string") {
      throw new CustomError(422, "Nome inválido");
    }
  };
  private buyer_email = (buyer_email: string) => {
    if (!buyer_email) {
      throw new CustomError(422, "E-mail inválido");
    }
    if (
      typeof buyer_email !== "string" ||
      !this.checkEmailFormat(buyer_email)
    ) {
      throw new CustomError(422, "Email Inválido");
    }
  };
  private buyer_cpf = (buyer_cpf: string) => {
    if (!buyer_cpf) {
      throw new CustomError(422, "Cpf  Inválido");
    }
    if (typeof buyer_cpf !== "string" || !this.checkCPFFormat(buyer_cpf)) {
      throw new CustomError(422, "Cpf Inválido");
    }
  };
  private payment_type = (payment_type: string) => {
    if (!(payment_type in PAYMENT_TYPE)) {
      throw new CustomError(
        422,
        "Tipo de pagamento inválido, escolha CREDITCARD ou SLIP"
      );
    }
  };
  private id = (id: string) => {
    if (!id || typeof id !== "string") {
      throw new CustomError(422, "ID de pagamento inválido");
    }
  };
  private CreditCard = (
    payment_type: string,
    card_holder_name: string | undefined,
    card_number: string | undefined,
    card_expiration_date: string | undefined,
    card_cvv: string | undefined
  ) => {
    if (payment_type === PAYMENT_TYPE.CREDITCARD) {
      if (typeof card_holder_name !== "string" || !card_holder_name) {
        throw new CustomError(422, 'Preencha o campo "card_holder_name"');
      }
      if (!card_number) {
        throw new CustomError(422, 'Preencha o campo "card_number"');
      }
      if (card_number.toString().length !== 16) {
        throw new CustomError(422, "Número do cartão de crédito inválido");
      }
      if (!card_expiration_date) {
        throw new CustomError(
          422,
          "'card_expiration_date' do cartão de crédito inválido"
        );
      }
      if (this.expiration_dateCheck(card_expiration_date)) {
        throw new CustomError(422, "Formato de data inválido");
      }

      if (!card_cvv) {
        throw new CustomError(422, "Missing card CVV");
      }
      if (typeof card_cvv !== "string" || card_cvv.toString().length !== 3) {
        throw new CustomError(422, "CVV do cartão inválido");
      }
    }
  };
  private payment_amount = (payment_amount: number) => {
    if (!payment_amount || typeof payment_amount !== "number") {
      throw new CustomError(422, "Quantia inválida");
    }
  };
  private checkEmailFormat = (email: string): boolean => {
    const emailValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailValid.test(email);
  };
  private checkCPFFormat = (cpf: string) => {
    const cpfValid = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return cpfValid.test(cpf);
  };
  private expiration_dateCheck = (card_expiration: string) => {
    if (
      typeof card_expiration !== "string" ||
      (!card_expiration.includes("/") && !card_expiration.includes("-"))
    ) {
      return true;
    }
    const currentDate = new Date().getTime();
    const card_expiration_date = new Date(
      card_expiration.split("/").reverse().join("-")
    ).getTime();

    if (card_expiration_date - currentDate < 0 || isNaN(card_expiration_date)) {
      return true;
    }
    return false;
  };
}
