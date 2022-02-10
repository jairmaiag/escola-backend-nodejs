-- Remove o banco caso exista.
DROP DATABASE IF exists escola;

-- Remoção do login escola caso exista.
DROP ROLE escola;

-- Criação do usuário do banco.
CREATE ROLE escola WITH LOGIN SUPERUSER CREATEDB CREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1;

-- Definindo a senha do usuário do banco.
ALTER USER escola PASSWORD 'escola';

-- Criação do banco de dados escola.
CREATE DATABASE escola WITH OWNER = escola ENCODING = 'UTF8' CONNECTION LIMIT = -1;

-- Definindo o usuário escola ao banco escola.
GRANT ALL ON DATABASE escola TO escola;

------------ OS COMANDOS ABAIXO DEVEM SER EXECUTADOS COM O BANCO SELECIONADO, DEVE-SE ABRIR UMA CONEXÃO COM O BANCO ESCOLA ATIVO ------------
--- Remoção do schema da escola, caso exista.
DROP SCHEMA IF EXISTS escola CASCADE;

-- Criação do esquema do banco escola
CREATE SCHEMA escola AUTHORIZATION escola;

-- Ativando a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

-- Remove tabela de pessoa
DROP TABLE IF EXISTS escola.pessoa CASCADE;

-- Criação da tabela de pessoa
CREATE TABLE escola.pessoa(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 ),
    uuid VARCHAR(37) NOT NULL DEFAULT uuid_generate_v4(),
    nome character varying(20) NOT NULL,
    sobrenome character varying(30) NULL,
    sexo CHAR NOT NULL DEFAULT 'M',
    nascimento DATE NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id)
);
COMMENT ON TABLE escola.pessoa IS 'Tabela de pessoa geral do sistema';

DROP TABLE IF EXISTS escola.papel CASCADE;

-- criação da tabela de perfil
CREATE TABLE escola.papel(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 ),
    uuid VARCHAR(37) NOT NULL DEFAULT uuid_generate_v4(),
    nome character varying(50) NOT NULL,
    CONSTRAINT pk_papel PRIMARY KEY (id)
);
COMMENT ON TABLE escola.papel IS 'Tabela de papel dos usuários';

DROP TABLE IF EXISTS escola.usuario CASCADE;

-- criação da tabela de usuário
CREATE TABLE escola.usuario(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 ),
    uuid VARCHAR(37) NOT NULL DEFAULT uuid_generate_v4(),
    senha character varying(50) NOT NULL,
    apelido character varying(30) NULL,
    email character varying(50) NOT NULL,
    idpessoa INTEGER NOT NULL,
    idpapel INTEGER NOT NULL,
   CONSTRAINT FK_pessoa FOREIGN KEY (idpessoa) REFERENCES pessoa ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT FK_papel FOREIGN KEY (idpapel) REFERENCES papel ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
   CONSTRAINT pk_idusuario PRIMARY KEY (id)
);
COMMENT ON TABLE escola.usuario IS 'Tabela de usuários do sistema';
