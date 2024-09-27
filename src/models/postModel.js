import {DataTypes} from "sequelize";

import Usuario from './usuarioModel.js'

const Postagem = conn.define(
    "Postagens", {
        postagemId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        conteudo: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./placeholder.png"
        },
    },{
        tablename: "Postagens",
        // Incluindo o nome do autor na busca por Postagems
        defaultScope: {
          include: [{ model: Usuario, attributes: ['nome'] }]
        }
    }
)

Usuario.hasMany(Postagem);
Postagem.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'autor' });
//usuario 1:N postagem

//Com `toJSON`, você pode personalizar como os dados serão transformados em JSON.
//O valor do campo autho, em vez de retornar um objeto com o nome, é definindo autor diretamente como o nome.
Postagem.prototype.toJSON = function () {
    let values = Object.assign( {}, this.get() );
    
    /* Object.assign(target, ...sources): função do JavaScript que é usada para copiar os valores de todas as propriedades enumeráveis de um ou mais objetos de origem para um objeto de destino.
    É criado um novo objeto (o primeiro argumento {}) que copia todos os atributos do objeto retornado por this.get() para esse novo objeto.
    Isso garante que values seja uma nova instância que contém todos os dados do modelo Postagem, permitindo que possamos modificar values sem afetar diretamente a instância original do modelo.*/

    // Se o usuário associado existir, substitua o campo "autor" por seu nome
    if (this.autor && this.autor.nome) {
      values.autor = this.autor.nome;
    }
  
    return values;
};

export default Postagem