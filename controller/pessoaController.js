const express = require('express');
const router = express.Router();
const service = require('../service/pessoaService');

router.get('/', async function (req, res, next) {
  const data = await service.findAll();
  res.status(200).send({mensagem:null,data});
});

router.get('/:uuid', async function (req, res, next) {
  let mensagem = null;
  let status = 200;
  const uuid = req.params;
  const data = await service.findByuuId(uuid.uuid);
  if(!data){
    mensagem='Registro não encontrado.';
    status=404;
  }
  res.status(status).send({mensagem,data});
});

router.put('/', async function (req, res, next) {
  let mensagem = null;
  let status = 200;
  const { uuid, nome, sobrenome, sexo, nascimento } = req.body;
  const pessoa = { uuid, nome, sobrenome, sexo, nascimento };
  const data = await service.update(pessoa);
  if(!data){
    mensagem='Registro não atualizado.';
    status=404;
  }
  res.status(status).send({mensagem,data});

});

module.exports = router;
