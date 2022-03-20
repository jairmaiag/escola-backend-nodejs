INSERT INTO papel("uuid", "nome") VALUES (uuid_generate_v4(), 'Administrador');
INSERT INTO papel("uuid", "nome") VALUES (uuid_generate_v4(), 'Diretor');
INSERT INTO papel("uuid", "nome") VALUES (uuid_generate_v4(), 'Professor');
INSERT INTO papel("uuid", "nome") VALUES (uuid_generate_v4(), 'Aluno');
INSERT INTO papel("uuid", "nome") VALUES (uuid_generate_v4(), 'Funcionario');

INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Sócrates', 'de Atenas', '1769-01-01');
INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Platão', 'Neoplatonismo', '1828-12-25');
INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Aristóteles', 'do Liceu', '1884-11-30');
INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Alexandre', 'O Grande', '1956-07-20');
INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Pitágoras', 'de Samos', '1956-07-20');
INSERT INTO pessoa("uuid", "nome", "sobrenome","sexo", "nascimento") VALUES (uuid_generate_v4(), 'Temistocleia', 'de delfos', 'F','1829-10-01');
INSERT INTO pessoa("uuid", "nome", "sobrenome","sexo", "nascimento") VALUES (uuid_generate_v4(), 'Enheduana', 'Sumeriana', 'F','1800-10-01');
INSERT INTO pessoa("uuid", "nome", "sobrenome","sexo", "nascimento") VALUES (uuid_generate_v4(), 'Melissa', 'Pitagorica', 'F','1820-10-11');
INSERT INTO pessoa("uuid", "nome", "sobrenome", "nascimento") VALUES (uuid_generate_v4(), 'Heráclito', 'de Éfeso', '1940-06-05');

INSERT INTO usuario("uuid", "senha", "apelido", "email", "pessoaid", "papelid") VALUES (uuid_generate_v4(), 'atenas399', 'O fudador', 'socrates@gmail.com',1,1);

-- Consultas 

-- Usuários com pessoa e pepel.
SELECT u.uuid as uuidusu,u.apelido,u.email,p.uuid as uuidpess, p.nome,p.sobrenome,p.sexo,p.nascimento,pa.uuid as uuidpapel, pa.nome AS nomepapel
	FROM usuario u 
	INNER JOIN pessoa p ON p.id=u.pessoaid
	INNER JOIN papel pa ON pa.id=u.papelid;