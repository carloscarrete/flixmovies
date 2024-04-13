import { getEmptyCastCredits, getEmptyMovieCastDetail, getEmptyMovieDetail, getEmptyMoviesDetail, getEmptyPeople, getEmptyMovieResult } from '../constants/movies';
import { Cast } from '../interfaces/Cast';
import { MovieDetail, Movies, Result } from '../interfaces/Movies';
import { CastCredits, People, PeopleCredits } from '../interfaces/People';
import { moviesApi } from './api/movies';



export const fetchPopularMovies = async () : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>('/movie/popular');
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchMoviesByTitle = async (title: string, page: number = 1) : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/search/movie?query=${title}/&page=${page}`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchNowPlaying = async () : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/movie/now_playing`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
} 

export const fetchTopRated = async () : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/movie/top_rated`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchUpcoming  = async () : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/movie/upcoming`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchTrendingMovies  = async () : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/trending/movie/day`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchMovieDetail = async (id: number) : Promise<MovieDetail> => {
    try{
        const {data} = await moviesApi.get<MovieDetail>(`/movie/${id}`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMovieDetail();
    }
}

export const fetchMovieCast = async (id:number) : Promise<Cast> => {
    try{
        const {data} = await moviesApi.get<Cast>(`movie/${id}/credits`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMovieCastDetail()
    }
}

export const fetchSimilarMovies = async (id: number) : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`movie/${id}/similar`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchPeopleDetails = async (id: number) : Promise<People> => {
    try{
        const {data} = await moviesApi.get<People>(`person/${id}`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyPeople()
    }
}

export const fetchPeopleMoviesDetailsCredits = async (id: number) : Promise<PeopleCredits> => {
    try{
        const {data} = await moviesApi.get<PeopleCredits>(`person/${id}/movie_credits`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMovieResult()
    }
}