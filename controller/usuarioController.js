const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuarioService');

router.get('/:uuid', async function (req, res, next) {
  let mensagem = null;
  let status = 200;
  const uuid = req.params;
  const data = await usuarioService.findByuuId(uuid.uuid);
  if (!data) {
    mensagem = 'Registro não encontrado.';
    status = 404;
  }
  res.status(status).send({ mensagem, data });
});
router.get('/', async function (req, res, next) {
  const lista = await usuarioService.findAll();
  res.status(200).send({ mensagem: null, data: lista });
});
router.post('/', async function (req, res, next) {
  let status = 200;
  const { nome, sobrenome, sexo, nascimento, senha, apelido, email, uuidpapel } = req.body;
  const usuario = { nome, sobrenome, sexo, nascimento, senha, apelido, email, uuidpapel };
  const retorno = await usuarioService.insert(usuario);
  res.status(status).send(retorno);
});
router.put('/', async function (req, res, next) {
  let status = 200;
  const { uuidpessoa, nome, sobrenome, sexo, nascimento, uuid, apelido, email, uuidpapel } = req.body;
  const usuario = { uuidpessoa, nome, sobrenome, sexo, nascimento, uuid, apelido, email, uuidpapel };
  const retorno = await usuarioService.update(usuario);
  res.status(status).send(retorno);
});
router.delete('/:uuid', async function (req, res, next) {
  let status = 200;
  const uuid = req.params;
  const retorno = await usuarioService.deleteByUuid(uuid.uuid);
  res.status(status).send(retorno);
});
module.exports = router;
