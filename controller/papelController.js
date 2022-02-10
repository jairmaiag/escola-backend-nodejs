const express = require('express');
const router = express.Router();
const service = require('../service/papelService');

router.get('/', async function (req, res, next) {
    const { status, mensagem, data } = await service.findAll();
    res.status(status).send({ mensagem, data });
});
router.get('/:uuid', async function (req, res, next) {
    const { uuid } = req.params;
    const { status, mensagem, data } = await service.findByUuId(uuid);
    res.status(status).send({ mensagem, data });
});
router.post('/', async function (req, res, next) {
    const { nomepapel } = req.body;
    const { status, mensagem, data } = await service.insert(nomepapel);
    res.status(status).send({ mensagem, data });
});
router.put('/', async function (req, res, next) {
    const { nomepapel, uuidpapel } = req.body;
    const papel = { nomepapel, uuidpapel };
    const { status, mensagem, data } = await service.update(papel);
    res.status(status).send({ mensagem, data });
});
router.delete('/:uuid', async function (req, res, next) {
    const { uuid } = req.params;
    const { status, mensagem, data } = await service.deleteByUuid(uuid);
    res.status(status).send({ mensagem, data });
});

module.exports = router;