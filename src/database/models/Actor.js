module.exports = (sequelize, dataTypes) => {
    const alias = "Actor"
    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }
    const config = {
        "tableName": "actors",
        "timestamps": false
    }

    const Actor = sequelize.define(alias,cols,config)

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie,{
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }

    return Actor
}