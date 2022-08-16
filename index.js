client.on('ready', () => {
    con.query(`SELECT * FROM users`, (err, res, name) => {
        console.log(res.length)
        res.forEach(row => {
            console.log(`${row.name} - ${row.identifier} Has ${row.bank} In The Bank`);
            //con.query(`UPDATE users SET bank = '${row.bank+20000}' WHERE identifier = '${row.identifier}'`);
        })
    })
})
