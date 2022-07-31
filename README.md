
<p>
<a href="#sobre">Sobre</a> |
<a href="#documentação">Documentação</a> |
<a href="#orientacoes">Orientações</a> |
<a href="#features">Features</a> |
<a href="#tecnologia">Tecnologia</a> |
<a href="#desenvolvedores">Desenvolvedores</a>
</p>

<h1 id="sobre">📕 WIRECARD BACKEND API</h1>

O projeto **WIRECARD** simula o registro de pagamentos de uma prestadora de serviços financeiros e foi baseado no case [Wirecard Backend Challenge](https://github.com/wirecardBrasil/challenge/tree/master/backend). **WIRECARD** é uma API para registro de pagamentos com Cartão de Crédito e Boleto, possui dois Endpoints: um para registro do pagamento e outro para verificar os dados do pagamento assim como seu status. A API foi desenvolvida utilizado as tecnologias **TYPESCRIPT, NODE.JS, EXPRESS.JS, MYSQL** como banco de dados e **JEST** para testes unitários.  Além disso, o projeto foi estruturado utilizando **PROGRAMAÇÃO ORIENTADA A OBJETOS(POO)** e princípios **S.O.L.I.D.** 

<h2 id="link">🔗 Link base da API</h2>

#### https://wirecard-efss7.herokuapp.com/

<h2 id="documentação">📃 Documentação do Postman</h2>

- [Postman](https://documenter.getpostman.com/view/20351432/UzdzTR9c)

<h2 id="orientacoes">🚨 Orientações para Uso</h2>

A API espera receber os seguinte dados em JSON:

- ID do cliente
- nome do comprador
- e-mail do comprador
- CPF do comprador
- valor do pagamento
- tipo do pagamento (SLIP ou CREDITCARD)
- nome do titular do cartão de crédito(Se o pagamento for cartão de crédito)
- número do cartão de crédito(Se o pagamento for cartão de crédito)
- data de expiração do cartão de credito(Se o pagamento for cartão de crédito)
- código de verificação do cartão de crédito(Se o pagamento for cartão de crédito)

O EndPoint de registro retorna o ID do pagamento e o tipo, caso seja por cartão de crédito, ou o número do boleto, caso seja por boleto.

O EndPoint de visualizar as informações do pagamento retorna as informações do pagamento e seu status.


<h2 id="features">✔️ Features</h2>

## 👤 Registro de Pagamento
EndPoint para cadastro de pagamentos à clientes WIRECARD previamente cadastrados e identificados pelo ID.

### CLIENTES E SEUS IDS

* Mercado Livre - ID: 7777ywI5kMwJOlkOAgsZTVxbfBOvPHy,
* Americanas - ID: a7GEsTYwhcGDcçIDo2rZHlfYxJz7828,
* Casas Bahia - ID: Jr3PybPdvçIZXHQ2020yfKdZcyEwkMÇ,
* Submarino - ID: NNWdqweryHQsp5bxU5QX7vAb1fcrT5ÇD,
* Amazon -ID: pnVLNKXOcuoltzNzKKbk3Qe8nwIkidp

#### Exemplos:

1. Requisição de pagamento com cartão de crédito
```
{

    "client_id": "pnVLNKXOcuoltzNzKKbk3Qe8nwIkidp",
    "buyer_name": "Michael Jackson",
    "buyer_email": "beatit@dev.com",
    "buyer_cpf": "928.092.074-49",
    "payment_amount":10,
    "payment_type" :"CREDITCARD",
    "card_holder_name":"M JACKSON", 
    "card_number":3264567235473290, 
    "card_expiration_date":"04/2030", 
    "card_cvv":"428"

}
```
2. Resposta
```
{
  "message": "Pagamento registrado com sucesso",
  "id": "eb61cbf4-040c-440f-ab6e-89185f46b4ea",
  "payment_type": "CREDITCARD"
}
```
3. pagamento com boleto
```
{
    "client_id": "pnVLNKXOcuoltzNzKKbk3Qe8nwIkidp",
    "buyer_name": "Al Pacino",
    "buyer_email": "scarface@dev.com",
    "buyer_cpf": "943.927.120-09",
    "payment_amount":1000,
    "payment_type" :"SLIP"
}
```
4. Resposta
```
{
  "Código de barras": "613067814531046417177858653534001371621640001687",
  "id": "8099fdc6-3aac-489d-b07b-a53b1c333f20",
  "payment_type": "SLIP"
}
```

## 🎙 Visualizar de Pagamento
Endpoint para consulta do status e informações sobre pagamento. Espera receber o Id e o tipo do pagamento passados pro query params.
1. Requisição 
```
GET  http://localhost:3003/payment/status?id=eb61cbf4-040c-440f-ab6e-89185f46b4ea&payment_type=CREDITCARD
```
2. Resposta 
```
[
  {
    "id": "eb61cbf4-040c-440f-ab6e-89185f46b4ea",
    "client_id": "pnVLNKXOcuoltzNzKKbk3Qe8nwIkidp",
    "buyer_name": "Michael Jackson",
    "buyer_email": "beatit@dev.com",
    "buyer_cpf": "928.092.074-49",
    "payment_amount": 10,
    "payment_type": "CREDITCARD",
    "card_holder_name": "M JACKSON",
    "card_number": "3264567235473290",
    "card_expiration_date": "04/2030",
    "card_cvv": "428",
    "payment_status": "APPROVED"
  }
]
```
 <h2 id="tecnologia">🛠 Tecnologias</h2>

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/docs/)
- [Jest](https://jestjs.io/pt-BR/docs/api)
- [MySql](https://dev.mysql.com/doc/)



<h2 id="desenvolvedor">👨‍💻 Desenvolvedor</h2>
<table>         
<td><a href="https://github.com/efss7"><img style="border-radius: 50%;" src="https://github.com/efss7.png" width="100px;" alt="Imagem profile Eric Felipe desenvolvedor"/><br /><sub><b>Eric Felipe</b></sub></a><br /> 

</table>

<a href="#voltar">Voltar para o topo ⬆️</a>
