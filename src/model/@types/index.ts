export enum PAYMENT_TYPE {
 CREDITCARD = "CREDITCARD",
 SLIP = "SLIP"
}

export type InputPaymentDTO = {
  client_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_cpf: string;
  payment_amount: number;
  payment_type: string;
  card_holder_name?: string;
  card_number?: string;
  card_expiration_date?: string;
  card_cvv?: string;
};
export type PaymentSlipDB = InputPaymentDTO & {
  id: string;
  slipNumber: string;
};

export type PaymentCreditCardDB = InputPaymentDTO & { id: string };

export type selectPaymentDTO = {
  id: string, 
  payment_type: string
}
export interface CreatePaymentDTO {
 client_id: string,
 buyer_name: string,
 buyer_email: string,
 buyer_cpf: string,
 payment_amount: number,
 payment_type: string,
 payment_status: string,
 card_holder_name: string,
 card_number: string,
 card_expiration_date: string,
 card_cvv: string
}
