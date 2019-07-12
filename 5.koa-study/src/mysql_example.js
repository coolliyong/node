const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'koa_blog',
})

module.exports = async ctx => {
  const result = await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user', (err, result, fields) => {
      if (err) throw err
      resolve(result)
    })
  })
  const text = result.map(v=>`id:${v.id},name:${v.name}`)
  ctx.body = text
}
