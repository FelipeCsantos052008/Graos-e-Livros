
CREATE DATABASE IF NOT EXISTS grainsandpages;

USE grainsandpages;

CREATE TABLE usuarios(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100),
	email VARCHAR(256),
	senha VARCHAR(256),
	idade INT
);

CREATE TABLE pedidos(
	id_pedido INT PRIMARY KEY AUTO_INCREMENT,
	id_livro INT NOT NULL,
	id_usuario INT,
	quantidade INT,
	preco INT,
	data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	data_entrega TIMESTAMP,
	CONSTRAINT pedidos_usr_fk FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
	CONSTRAINT pedidos_livros FOREIGN KEY(id_livro) REFERENCES livros(id_livro)
);

CREATE TABLE livros(
	id_livro INT PRIMARY KEY AUTO_INCREMENT,
	genero VARCHAR(100),
	autor VARCHAR(100),
	quantidade INT,
	preco INT,
	data_publicacao TIMESTAMP
);