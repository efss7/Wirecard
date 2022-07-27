export default class CreditCard {
  constructor(
    private id: string,
    private buyer_name: string,
    private buyer_email: string,
    private buyer_cpf: string,
    private payment_amount: number,
    private payment_type: string,
    private payment_status: string,
    private card_holder_name: string,
    private card_number: string,
    private card_expiration_date: string,
    private card_cvv: string
  ) {}
}
