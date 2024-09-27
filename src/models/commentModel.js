import { type } from "os";
import {DataTypes} from "sequelize";

import Usuario from './userModel.js'
import Postagem from "./postModel.js";

const Comentario = conn.define(
    "comentarios", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        conteudo: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        usuarioId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Usuario, // Nome do modelo Usuario
              key: 'usuarioId' // Campo referenciado no modelo Usuario
            }
          },
          postagemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Postagem, // Nome do modelo Post
              key: 'postagemId' // Campo referenciado no modelo Post
            }
          }
    },{
        tablename: "comentarios"
    }
)

Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
//Usuario 1:n comentario

Post.hasMany(Comentario, { foreignKey: 'postagemId' });
Comentario.belongsTo(Post, { foreignKey: 'postagemId' });
//postagem 1:n comentario

export default Comentario