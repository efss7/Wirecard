import { CustomError } from "../business/errors/CustomError";
import { PaymentCreditCardDB } from "../model/@types";
import BaseDatabase from "./BaseDatabase";

export class PaymentData extends BaseDatabase {
  insertPaymentCard = async (input: PaymentCreditCardDB) => {
    try {
      await BaseDatabase.connection("wirecard_payment_creditcard")
      .insert(
        input
      );
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };
  insertPaymentSlip = async (input: PaymentCreditCardDB) => {
    try {
      await BaseDatabase.connection("wirecard_payment_slip")
      .insert(
        input
      );
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };
  selectPaymentCreditCard = async (id:string) => {
    try {
      const result = await BaseDatabase.connection("wirecard_payment_creditcard")
      .select("*")
      .where({id})
      return result
    } catch (error:any) {
      throw new CustomError(500, error.sqlMessage)
    }
  }
  selectPaymentSlip = async (id:string)=>{
    try {
      const result = await BaseDatabase.connection("wirecard_payment_slip")
      .select("*")
      .where({id})
      return result
    } catch (error:any) {
      throw new CustomError(500, error.sqlMessage)
    }
  }
}
