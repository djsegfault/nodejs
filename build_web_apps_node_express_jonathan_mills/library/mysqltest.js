const sql = require('mysql');


// Set up database connection
const sqlConnection = sql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'PSLibrary'
});

sqlConnection.connect(function (error) {
    if (error) {
        console.log(`Error ${error} creating connection to database`);
        return;
    }
    sqlConnection.query("select id, title, author from books order by id", function (error, result, fields) {
        if (error) {
            console.log(`Error ${error} connecting to database`);
            return;
        }
        // console.log(result);

        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            console.log(row.id);
            console.log(row.author);
            console.log(row.title);
            console.log('-------');
        }
        console.log("Out of loop");

    });
    console.log("Out of query");

    console.log("Out of connect");
    sqlConnection.end((error) => {
        if (error) {
            console.log(`Error ${error} disconnecting to database`);
            return;
        }
        console.log("Disconnected from the database");

    });
});
console.log("Out of connect");
