import { Request, Response } from "express";
import { TMDBQueryOptions } from "./types/types";
import crypto from 'crypto';

export function notFound (_req: Request, res: Response) {
    res.status(404).send();
}

/**
 * SEARCH
 */
function parseQuery (query: string) {
    if(typeof query != 'string' || !query.trim())
        throw new TypeError('Bad request');

    return query.trim();
}

export function createSearchParams(apiKey: string, search: string, options: TMDBQueryOptions ) {
    return {
        api_key  : apiKey,
        query    : parseQuery(search),
        language : options.language || 'en-US',
        limit    : options.limit || 1,
        include_adult: 'false'  
    }
}

export function randomString(): string {
    return crypto.randomBytes(8).toString('hex');
}