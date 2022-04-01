const db = require('../database/models');
const sequelize = db.sequelize;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,{include: ["actors","genero"]})
            .then(movie => {
                //console.log(movie)
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    'create': (req, res) => {
        res.render('createView.ejs');
    },
    'createPOST': (req, res) => {
        let data = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date
        }
        db.Movie.create(data)
            .then(() => {
                res.redirect('/movies')
            })
    },
    'edit': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesEdit.ejs', {movie});
            });
    },
    'editPUT': (req, res) => {
        let data = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date
        }
        db.Movie.update(data, {where:{id: req.params.id}})
            .then(() => {
                res.redirect('/movies')
            })
    },
    'deletePUT': (req, res) => {

        
        db.Movie.findByPk(req.params.id)
            .then(function(Movie){
                Movie.setActors([]) //borrando row de la tabla intermedia (movie-actors)

                db.Movie.destroy({where:{id: req.params.id}}) //borra el row en movie
                    .then(() => {
                        res.redirect('/movies')
            });
        })
    }
}

module.exports = moviesController;