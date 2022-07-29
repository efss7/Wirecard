import { InputPaymentDTO } from "../../model/@types";
import { CustomError } from "../errors/CustomError";

export class PaymentValidation{
    createPayment(input:InputPaymentDTO){}
    selectPayment(input:InputPaymentDTO){}

    private id = (id:string):void => {
        if(!id || typeof(id) !== 'string') {
            throw new CustomError(422,'Id inválido')
        }
    }
}


