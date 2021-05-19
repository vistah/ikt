import mysql from 'mysql'
export const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "ihrPasswort",
    database: "posts"
});

connection.connect((error)=> {
    if(error) throw error;
    console.log("Connented with database...");
})