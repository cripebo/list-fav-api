export interface MovieListResult {
    poster_path: string | null
    adult: boolean
    overview: string
    release_data: string
    genre_ids: number[]
    id: number
    original_title: string
    original_language: string
    title: string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    video: boolean
    vore_average: number
}

export interface SearchMovieResult {
    page: number
    results: MovieListResult[]
    total_results: number
    total_pager: number
}

export interface ApiParams {
    api_key  : string
    query    : string
    language : string
    region   : string
    limit    : string
    include_adult: boolean  
}

export interface TMDBQueryOptions {
    language : string
    region?  : string
    limit    : string
    include_adult: boolean  
}

export type ApiSimpleQueryParams = Pick<ApiParams, 'api_key' | 'query'>;
export type ApiMinimalParams = Pick<ApiParams, 'api_key'>;

export interface DataAccessResult {
    error: string | null
    data: []
}

export interface LFList {
    id?: number
    user_id: number
    name: string
    tags: string[]
    ranked: boolean
    movies: LFMovie[]
}

export interface LFMovie {
    id: number
    rate: number
}

export interface LFUser {
    id: number
    alias: string
    token: string
}