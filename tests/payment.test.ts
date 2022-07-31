import PaymentBusiness from "../src/business/PaymentBusiness";
import { PaymentValidation } from "../src/business/validation/PaymentValidation";
import IdGeneratorMock from "./mocks/idGeneratorMock";
import { PaymentDataMock } from "./mocks/PaymentDataMock";
import { PaymentValidationMock } from "./mocks/PaymentValidationMock";

const paymentValidationMock = new PaymentValidation();

const InputsMock = {
  id: "id2",
  client_id: "idclient2",
  buyer_name: "Michael Jackson",
  buyer_email: "beatit@dev.com",
  buyer_cpf: "839.289.953-04",
  payment_amount: 900,
  payment_type: "CREDITCARD",
  card_holder_name: "M Jackson",
  card_number: "9348237824505839",
  card_expiration_date: "05/2030",
  card_cvv: "374",
};

describe("test class PaymentValidation", () => {
  describe("test createPayment", () => {
    test("test missing client_id", () => {
      const input = InputsMock;
      input.client_id = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.client_id = "idclient2";
        expect(error.message).toEqual("Id inválido");
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing buyer_name", () => {
      const input = InputsMock;
      input.buyer_name = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.buyer_name = "Michael Jackson";
        expect(error.message).toEqual("Nome inválido");
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing buyer_email", () => {
      const input = InputsMock;
      input.buyer_email = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.buyer_email = "beatit@dev.com";
        expect(error.message).toEqual("E-mail inválido");
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing buyer_cpf", () => {
      const input = InputsMock;
      input.buyer_cpf = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.buyer_cpf = "839.289.953-04";
        expect(error.message).toEqual("Cpf  Inválido");
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing payment_amount", () => {
      const input = InputsMock;
      input.payment_amount = 0;
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.payment_amount = 900;
        expect(error.message).toEqual("Quantia inválida");
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing payment_type", () => {
      const input = InputsMock;
      input.payment_type = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.payment_type = "CREDITCARD";
        expect(error.message).toEqual(
          "Tipo de pagamento inválido, escolha CREDITCARD ou SLIP"
        );
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing card_holder_name", () => {
      const input = InputsMock;
      input.card_holder_name = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.card_holder_name = "M Jackson";
        expect(error.message).toEqual('Preencha o campo "card_holder_name"');
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing card_number", () => {
      const input = InputsMock;
      input.card_number = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.card_number = "9348237824505839";
        expect(error.message).toEqual('Preencha o campo "card_number"');
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing card_expiration_date", () => {
      const input = InputsMock;
      input.card_expiration_date = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.card_expiration_date = "05/2030";
        expect(error.message).toEqual(
          "'card_expiration_date' do cartão de crédito inválido"
        );
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing card_expiration_date", () => {
      const input = InputsMock;
      input.card_cvv = "";
      try {
        paymentValidationMock.createPayment(input);
      } catch (error: any) {
        input.card_cvv = "374";
        expect(error.message).toEqual(
          "'card_cvv' do cartão de crédito inválido"
        );
        expect(error.statusCode).toStrictEqual(422);
      } finally {
        expect.assertions(2);
      }
    });
    test("test current inputs", () => {
      const inputs = InputsMock;
      try {
        const insert = jest.fn((inputs) =>
          paymentValidationMock.createPayment(inputs)
        );
        const result = insert(inputs);
        expect(insert).toBeCalled();
        expect(insert).toBeCalledWith(inputs);
        expect(result).toBeUndefined();
        expect(insert).toHaveReturned();
      } catch (error: any) {
        console.log(error.statusCode, error.message);
      } finally {
        expect.assertions(4);
      }
    });
    describe("test status method", () => {
      test("test missing id", () => {
        const input = { id: "", payment_type: "SLIP" };
        try {
          paymentValidationMock.selectPayment(input);
        } catch (error: any) {
          expect(error.message).toEqual("ID de pagamento inválido");
          expect(error.statusCode).toStrictEqual(422);
        } finally {
          expect.assertions(2);
        }
      });
    });
  });
});
