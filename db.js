const { Pool } = require('pg');
const pool = new Pool({
    user: 'escola',
    host: '127.0.0.1',
    database: 'escola',
    password: 'escola',
    port: 5432,
});

function query(sql,params){
    const config = {
        text:sql,
        values:params
    }
    return pool.query(config);
}
module.exports ={query:query};