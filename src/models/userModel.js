import { type } from "os";
import {DataTypes} from "sequelize";

const Usuario = conn.define(
    "usuarios", {
        usuarioId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./placeholder.png"
        },
        papel: {
            type: DataTypes.ENUM,
            values: ["administrador", "autor", "leitor"]
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        }
    },{
        tablename: "usuarios"
    }
)

export default Usuario