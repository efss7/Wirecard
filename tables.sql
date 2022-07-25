-- Active: 1653331321827@@35.226.146.116@3306@silveira-21814331-eric-silva
CREATE TABLE IF NOT EXISTS wirecardClientId (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS wirecardBuyer (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_email VARCHAR(255) NOT NULL,
    buyer_CPF VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS wirecardCreditCard (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    card_name VARCHAR(255) NOT NULl,
    card_number BIGINT NOT NULL,
    card_expiration VARCHAR(255) NOT NULL,
    card_CVV INT NOT NULL
);

CREATE TABLE IF NOT EXISTS wirecardPaymentBoleto (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    amount INT NOT NULL,
    type Enum ('BOLETO') NOT NULL,
    status ENUM('CONCLUED','PENDENT','EXPIRED') DEFAULT ('PENDENT'),
    number VARCHAR(255) NOT NULL,
    clientId VARCHAR(255) NOT NULL,
    buyerId VARCHAR(255) NOT NULL,
    FOREIGN KEY(clientId) REFERENCES wirecardClientId(id),
    FOREIGN KEY(buyerId) REFERENCES wirecardBuyer(id)
);

CREATE TABLE IF NOT EXISTS wirecardPaymentCreditCard (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    amount INT NOT NULL,
    type Enum ('CREDITCARD') NOT NULL,
    status ENUM('CONCLUED','PENDENT','REFUSED','REVERSED') DEFAULT ('PENDENT'),
    clientId VARCHAR(255) NOT NULL,
    buyerId VARCHAR(255) NOT NULL,
    creditCard VARCHAR(255) NOT NULL,
    FOREIGN KEY(clientId) REFERENCES wirecardClientId(id),
    FOREIGN key(buyerId) REFERENCES wirecardBuyer(id),
    FOREIGN key(creditCard) REFERENCES wirecardCreditCard(id)
);