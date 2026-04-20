const { movieModel, userModel } = require('../models');

function getMovies(req, res, next) {
    movieModel.find()
        .populate('ownerId')
        .then(movies => res.json(movies))
        .catch(next);
}

function getMovie(req, res, next) {
    const { movieId } = req.params;

    movieModel.findById(movieId)
        .populate('ownerId')
        .then(movie => res.json(movie))
        .catch(next);
}

function createMovie(req, res, next) {
    const { title, imageUrl, genre, year, description } = req.body;
    const { _id: ownerId } = req.user;

    movieModel.create({ title, imageUrl, genre, year, description, ownerId })
        .then(movie => {
            userModel.findByIdAndUpdate(
                { _id: ownerId }, 
                { $push: { movies: movie._id } },
                { new: true }
            )
            .then(() => res.status(200).json(movie))
        })
        .catch(next);
}

function editMovie(req, res, next) {
    const { movieId } = req.params;
    const { title, imageUrl, genre, year, description } = req.body;
    const { _id: userId } = req.user;

    movieModel.findOneAndUpdate(
        { _id: movieId, ownerId: userId }, 
        { title, imageUrl, genre, year, description },
        { new: true }
    )
        .then(updatedMovie => {
            if (updatedMovie) {
                res.status(200).json(updatedMovie);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function deleteMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        movieModel.findOneAndDelete({ _id: movieId, ownerId: userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: movieId } })
    ])
        .then(([deletedMovie, _]) => {
            if (deletedMovie) {
                res.status(200).json(deletedMovie);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function likeMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;

    movieModel.findByIdAndUpdate(
        { _id: movieId }, 
        { $addToSet: { likes: userId } },
        { new: true }
    )
        .then(movie => res.status(200).json(movie))
        .catch(next);
}

function unlikeMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;

    movieModel.findByIdAndUpdate(
        { _id: movieId }, 
        { $pull: { likes: userId } },
        { new: true }
    )
        .then(movie => res.status(200).json(movie))
        .catch(next);
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    editMovie,
    deleteMovie,
    likeMovie,
    unlikeMovie,
}
