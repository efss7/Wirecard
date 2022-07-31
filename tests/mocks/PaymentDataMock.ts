import { PaymentCreditCardDB, PaymentSlipDB } from "../../src/model/@types";
import { paymentCreditCard, paymentSlip } from "./PaymentMock";

export class PaymentDataMock {
  insertPaymentCard = async (input: PaymentCreditCardDB) => {};
  insertPaymentSlip = async (input: PaymentSlipDB) => {};
  selectPaymentCreditCard = async (id: string) => {
    if (id === paymentCreditCard.id) {
      return paymentCreditCard;
    }
  };
  selectPaymentSlip = async (id: string) => {
    if (id === paymentSlip.id) {
      return paymentSlip;
    }
  };
}
