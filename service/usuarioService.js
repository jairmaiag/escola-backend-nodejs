const db = require('../db');
const pessoaService = require('./pessoaService');
const camposPapel = "pa.uuid as uuidpapel, pa.nome as nomepapel";
const camposPessoa = "p.uuid as uuidpessoa, p.nome, p.sobrenome, p.sexo, p.nascimento";
const camposUsuario = "select u.uuid, u.apelido, u.email";
const camposSql = `${camposUsuario} from usuario u`;
const innerPessoa = 'inner join pessoa p on p.id=u.idpessoa';
const innerPapel = 'inner join papel pa on pa.id=u.idpapel';
const completoSql = `${camposUsuario},${camposPessoa},${camposPapel} from usuario u ${innerPessoa} ${innerPapel}`;

const findById = async (id) => {
    if (!id) {
        return null;
    }
    const retorno = await db.query(`${camposSql} where u.id=$1`, [id]);
    return retorno.rows[0];
};
const findByIdPessoa = async (idPessoa) => {
    if (!idPessoa) {
        return null;
    }
    const retorno = await db.query(`${camposSql} where u.idpessoa=$1`, [idPessoa]);
    return retorno.rows[0];
};
const findByuuId = async (uuid) => {
    let retorno = null;
    if (!uuid) {
        return retorno;
    }
    try{
        const {rows} = await db.query(`${completoSql} where u.uuid=$1`, [uuid]);
        retorno = rows[0];
    }catch(err){
        retorno = err; 
    }
    return retorno;
};
const findByEmail = async (email) => {
    if (!email) {
        return null;
    }
    const {rows} = await db.query(`${camposSql} where u.email=$1`, [email]);
    return rows[0];
};
const findAll = async () => {
    const {rows} = await db.query(`${completoSql}`);
    return rows;
};
const insert = async (usuario) => {
    const { nome, sobrenome, sexo, nascimento, senha, apelido, email } = usuario;
    let mensagem = null;
    let dados = null;
    const emailUsado = await db.query(`${camposSql} where u.email=$1 order by u.id desc`, [email]);
    /* Validação de email já utilizado */
    if (emailUsado.rowCount > 0) {
        dados = emailUsado.rows[0];
        mensagem = `Email [${dados.email}] já está em uso pelo usuário de apelido [${dados.apelido}]`;
        return { mensagem, data: dados };
    }
    /* Verifica se já existe a pessoa cadastrada para vincular ao usuário. */
    const pessoa = { nome, sobrenome, sexo, nascimento };
    let pessoaJaCadastrada = await pessoaService.findByNomeSobrenomeNascimento(pessoa);

    if (pessoaJaCadastrada) {
        const usuarioVinculado = await findByIdPessoa(pessoaJaCadastrada.id);
        if (usuarioVinculado) {
            mensagem = `Usuário já cadastrado.`;
            return { mensagem, data: usuarioVinculado };
        }
    } else {
        pessoaJaCadastrada = await pessoaService.insert(pessoa);
    }
    const includeUsuario = await db.query('insert into usuario (senha,apelido,email,idpessoa) values ($1,$2,$3,$4)', [senha, apelido, email, pessoaJaCadastrada.id]);
    const retorno = await db.query(`${completoSql} where u.senha=$1 and u.apelido=$2 and u.email=$3 and u.idpessoa=$4 order by u.id desc`, [senha, apelido, email, pessoaJaCadastrada.id]);
    return { mensagem, data: retorno.rows };
};
const update = async (usuario) => {
    let mensagem = null;
    let data = null;
    const { uuidpessoa, nome, sobrenome, sexo, nascimento, uuid, apelido, email,uuidpapel } = usuario;
    const pessoa = { uuid: uuidpessoa, nome, sobrenome, sexo, nascimento };
    await pessoaService.update(pessoa);
    await db.query('update usuario set apelido=$1,email=$2 where uuid=$3', [apelido, email, uuid]);
    data = await findByuuId(uuid);
    return { mensagem, data };
};
const deleteByUuid = async (uuid) => {
    let mensagem = null;
    let data = await findByuuId(uuid);
    if(data){
        await db.query('delete from usuario where uuid=$1', [uuid]);
    }else{
        mensagem=`Registro não encontrado.`;
    }
    return { mensagem, data };
};
module.exports = { findById, findByuuId, findByEmail, findAll, insert, update, deleteByUuid };