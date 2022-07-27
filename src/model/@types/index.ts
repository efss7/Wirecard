export type InputPaymentSlipDTO = {
  client_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_cpf: string;
  payment_amount: number;
  payment_type: string;
};

export type InputPaymentCreditCardDTO = InputPaymentSlipDTO & {
  card_holder_name?: string;
  card_number?: string;
  card_expiration_date?: string;
  card_cvv?: string;
};

export type PaymentSlipDB = InputPaymentSlipDTO & {
  id: string;
  slipNumber: string;
};

export type PaymentCreditCardDB = InputPaymentCreditCardDTO & { id: string };

