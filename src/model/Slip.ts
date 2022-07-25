export default class slip {
  constructor(
    private id: string,
    private client_id: string,
    private buyer_name: string,
    private buyer_email: string,
    private buyer_cpf: string,
    private payment_amount: number,
    private payment_type: string,
    private payment_status: string
  ) {}
}
