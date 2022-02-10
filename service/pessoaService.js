const db = require('../db');
const camposPessoa = "p.uuid, p.nome, p.sobrenome, p.sexo, p.nascimento";
const campoComId = `p.id, ${camposPessoa}`;
const camposSql = `select ${camposPessoa} from pessoa p`;

const findById = async (id) => {
    if (!id) {
        return null;
    }
    const retrno = await db.query(`select ${campoComId} from pessoa p where p.id=$1`, [id]);
    return retrno.rows[0];
};
const findByuuId = async (uuid) => {
    if (!uuid) {
        return null;
    }
    const retrno = await db.query(`${camposSql} where p.uuid=$1`, [uuid]);
    return retrno.rows[0];
};
const findByNomeSobrenomeNascimento = async (pessoa) => {
    const { nome, sobrenome, sexo, nascimento } = pessoa;
    const retorno = await db.query(`${camposSql} where p.nome=$1 and p.sobrenome=$2 and p.sexo=$3 and p.nascimento=$4 order by p.id desc`, [nome, sobrenome, sexo, nascimento]);
    return retorno.rows[0];
};
const findPessoaComoUsuario = async (id) => {
    const retorno = await db.query(`${camposSql} inner join usuario u on p.id=u.idpessoa where p.id=$1 order by p.id desc`, [id]);
    return retorno.rows[0];
};
const findAll = async () => {
    const retorno = await db.query(`${camposSql}`);
    return retorno.rows;
};
const insert = async (pessoa) => {
    const { nome, sobrenome, sexo, nascimento } = pessoa;
    const includePessoa = await db.query('insert into pessoa (nome,sobrenome,sexo,nascimento) values ($1,$2,$3,$4)', [nome, sobrenome, sexo, nascimento]);
    const retorno = await db.query(`${camposSql} where nome=$1 and sobrenome=$2 order by id desc`, [nome, sobrenome]);
    return retorno.rows;
};

const update = async (pessoa) => {
    const { uuid, nome, sobrenome, sexo, nascimento } = pessoa;
    const updatePessoa = await db.query('update pessoa set nome=$1,sobrenome=$2,sexo=$3,nascimento=$4 where uuid=$5', [nome, sobrenome, sexo, nascimento, uuid]);
    const retorno = await findByuuId(uuid);
    return retorno;
};

module.exports = { findById, findByuuId, findByNomeSobrenomeNascimento, findPessoaComoUsuario, findAll, insert, update };