const sql = require('mysql');


// Set up database connection
const sqlConnection = sql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'PSLibrary'
});
console.log("Connected to database");
sqlConnection.query("select id, title, author from books order by id", (error, result, fields) => {
    if (error) {
        return console.error(`Error ${error} connecting to database`);
    }
    for (var i = 0; i < result.length; i++) {
        var row = result[i];
        console.log(`${i}:${row.id}:${row.author}:${row.title}`);
    }
    console.log("Out of loop");

});
console.log("Out of query");

sqlConnection.end((error) => {
    if (error) {
        return console.error(`Error ${error} disconnecting to database`);
    }
    console.log("Disconnected from the database");

});
console.log("Done");
