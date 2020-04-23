const sql = require('mysql');


// Set up database connection
const con = sql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'PSLibrary'
});

con.connect(function (err) {
    if (err) throw err;
    con.query("select id, title, author from books order by id", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            console.log(row.id);
            console.log(row.author);
            console.log(row.title);
            console.log('-------');
        }
    });
});
