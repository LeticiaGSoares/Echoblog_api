import { Sequelize } from "sequelize"
import "dotenv/config"

const db = {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
}

const conn = new Sequelize(
    db.name, db.user, db.password, 
    { 
        host: db.host, 
        dialect: db.dialect 
    }
)

try{
    await conn.authenticate();
    console.log("Connected to MySql")
}catch(error){
    console.error("ERR [conn.js]:", error)
}

export default conn