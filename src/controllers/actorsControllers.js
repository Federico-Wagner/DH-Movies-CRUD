const db = require('../database/models');
const sequelize = db.sequelize;


const actorController = {
    'list': (req,res)=>{
        db.Actor.findAll()
            .then(actors=>{
                res.render('actorsList.ejs', {actors})
            })
    }
}


module.exports = actorController


    
