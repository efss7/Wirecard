CREATE TABLE wirecard_client (
    id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE wirecard_payment_creditcard (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_email VARCHAR(255) NOT NULL,
    buyer_cpf VARCHAR(255) NOT NULL,
    payment_amount INT NOT NULL,
    payment_type ENUM('CREDITCARD') NOT NULL,
    card_holder_name VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    card_expiration_date VARCHAR(255) NOT NULL,
    card_cvv VARCHAR(255) NOT NULL,
    payment_status ENUM('PENDING', 'APPROVED') DEFAULT 'APPROVED',
    FOREIGN KEY (client_id) REFERENCES wirecard_client(id)
);

CREATE TABLE wirecard_payment_slip (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_email VARCHAR(255) NOT NULL,
    buyer_cpf VARCHAR(255) NOT NULL,
    payment_amount INT NOT NULL,
    payment_type ENUM('SLIP') NOT NULL,
    slipNumber VARCHAR(255) NOT NULL,
    payment_status ENUM('APPROVED', 'PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (client_id) REFERENCES wirecard_client(id)
);
