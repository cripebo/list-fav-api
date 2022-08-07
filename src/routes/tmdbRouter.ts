import express from 'express';
import * as TMDBController from '../controllers/tmdbController';

const router = express.Router();

router.get('/popular', TMDBController.getPopular);
router.get('/search', TMDBController.searchMovies);
router.get('/movie/:id', TMDBController.getMovieDetails);
router.get('/credits/:id', TMDBController.getMovieCredits);
router.get('*', (_, res) => res.status(404).send());

export default router;