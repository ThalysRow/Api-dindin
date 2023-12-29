create database dindin;

create table users (
id serial primary key,
name text,
email text unique,
password text
)

create table categories (
id serial primary key,
description text
)

create table transactions (
id serial primary key,
description text,
value int,
data date,
category_id integer references categories(id),
user_id integer references users(id),
type text
)

insert into categories (description) values
('Alimentação'),('Assinaturas e Serviços'), ('Casa'), ('Mercado'),('Cuidados Pessoais'),
('Educação'),('Família'),('Lazer'),('Pets'), ('Presentes'),('Roupas'),('Saúde'),
('Transporte'),('Salário'),('Vendas'),('Outras receitas'),('Outras despesas')