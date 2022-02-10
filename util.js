const montarRetorno = async (dados, codigoStatus, texto) => {
    if (!dados) {
        return { status: 400, mensagem: "Parâmetros inválidos ou incompleto.", data: null };
    }
    if (dados && codigoStatus && texto) {
        return { status: codigoStatus, mensagem: texto, data: dados };
    }
    if (dados.length === 0) {
        return { status: 204, mensagem: "Registro(s) não encontrado(s).", data: null };
    } else {
        return { status: 200, mensagem: null, data: (dados.length > 1 ? dados : dados[0]) };
    }
}
module.exports = { montarRetorno };