import axios from "axios";
import { Request, Response } from "express";
import { TMDBQueryOptions } from "../types/types";
import { createSearchParams } from "../utils";
const API_KEY = process.env.TMDB_API_KEY as string;
const API_BASE_URL = process.env.TMDB_API_URL as string;

let popularCache: null | any  = null;


// TODO: comprobar fechas para que a las 24h se vuelva a hacer request de populares (60 * 60 * 24 * 1000) 24h milisegundos
async function getPopular(_req: Request, res: Response) {
    if(!popularCache) {
        try {
            const query = await axios(`${API_BASE_URL}/movie/popular`, { params: {api_key: API_KEY} });
    
            popularCache = query.data;
        } 
        catch (error) {
            res.json({error: 'Error on provider server on popular'});
        }
    }
    
    res.status(200).contentType('application/json').json(popularCache);
}


/**TODO: Hay que validar los campos que nos llegan*/
async function searchMovies(req: Request, res: Response) {
    const search: string = String(req.query.q);    
    const options: TMDBQueryOptions= req.body;

    try {
        const params = createSearchParams(API_KEY, search, options);
        const query = await axios.get(`${API_BASE_URL}/search/movie`, { params });

        res.status(200).contentType('application/json').send(query.data);
    } 
    catch (error) {
        if(error instanceof TypeError)
            res.json({error: error.message});
        
        else
            res.json({error: 'Error on provider server on popular'});
    }
}


/**
 * Get movie details from TMDB
 */
async function getMovieDetails(req: Request, res: Response) {
    const movieId = req.params.id;
    const params = {api_key: API_KEY}

    try {
        const query  = await axios.get(`${API_BASE_URL}/movie/${movieId}`, { params });

        res.status(200).contentType('application/json').send(query.data);

    } catch (error) {
        if(error instanceof TypeError)
            res.json({error: error.message});
        
        else
            res.json({error: 'Error on provider server on movie details'});
    }
}

async function getMovieCredits(req: Request, res: Response) {
    const movieId = req.params.id;
    const params = {api_key: API_KEY};

    try {
        const query  = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, { params });

        res.status(200).contentType('application/json').send(query.data);

    } catch (error) {
        if(error instanceof TypeError)
            res.json({error: error.message});
        
        else
            res.json({error: 'Error on provider server on movie credits'});
    }
    
}


export { getPopular, searchMovies, getMovieDetails, getMovieCredits };