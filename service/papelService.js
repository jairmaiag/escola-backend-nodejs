const db = require('../db');
const camposPapel = "pa.uuid as uuidpapel, pa.nome as nomepapel";
const camposSql = `select ${camposPapel} from papel pa`;
const { montarRetorno } = require('../util');

const findById = async (id) => {
    if (!id) {
        return await montarRetorno(null);
    }
    const { rows } = await db.query(`${camposSql} where pa.id=$1`, [id]);
    return await montarRetorno(rows);
};
const findByUuId = async (uuid) => {
    if (!uuid) {
        return await montarRetorno(null);
    }
    const { rows } = await db.query(`${camposSql} where pa.uuid=$1`, [uuid]);
    return await montarRetorno(rows);
};
const findAll = async () => {
    const { rows } = await db.query(`${camposSql} order by pa.nome`);
    return await montarRetorno(rows);
};
const findByNomePapel = async (nomepapel) => {
    if (!nomepapel) {
        return await montarRetorno(null);
    }
    const { rows } = await db.query(`${camposSql} where pa.nome=$1 order by pa.nome`, [nomepapel]);
    return await montarRetorno(rows);
};
const insert = async (nomepapel) => {
    if (!nomepapel) {
        return await montarRetorno(null);
    }
    let jaCadastrado = await findByNomePapel(nomepapel);
    if (jaCadastrado.data) {
        return await montarRetorno(jaCadastrado.data, 400, 'Registro já cadastrado');
    }
    const includePapel = await db.query('insert into papel (nome) values ($1)', [nomepapel]);
    return await findByNomePapel(nomepapel);
};
const update = async (papel) => {
    const { nomepapel, uuidpapel } = papel;
    const cadastrado = await findByUuId(uuidpapel);
    if(!cadastrado.data){
        return cadastrado;
    }
    await db.query('update papel set nome=$1 where uuid=$2', [nomepapel, uuidpapel]);
    return await findByUuId(uuidpapel);
};
const deleteByUuid = async (uuid) => {
    const cadastrado = await findByUuId(uuid);
    if(cadastrado.data){
        await db.query('delete from papel where uuid=$1', [uuid]);
    }
    return cadastrado;
};

module.exports = { findById, findByUuId, findAll, insert, update, deleteByUuid };