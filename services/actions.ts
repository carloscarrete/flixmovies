import { getEmptyGithubVersion } from '../constants/github';
import { getEmptyCastCredits, getEmptyMovieCastDetail, getEmptyMovieDetail, getEmptyMoviesDetail, getEmptyPeople, getEmptyMovieResult } from '../constants/movies';
import { Cast } from '../interfaces/Cast';
import { GithubVersion } from '../interfaces/GitHubVersion';
import { MovieDetail, Movies, Result } from '../interfaces/Movies';
import { CastCredits, People, PeopleCredits } from '../interfaces/People';
import { gitHubApiApk, moviesApi } from './api/movies';



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

export const fetchTopRated = async (page: number = 1) : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/movie/top_rated?page=${page}`);
        return data;
    }catch(error){
        console.log(error)
        return getEmptyMoviesDetail()
    }
}

export const fetchUpcoming  = async (page: number = 1) : Promise<Movies> => {
    try{
        const {data} = await moviesApi.get<Movies>(`/movie/upcoming?page=${page}`);
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

export const getLastestVersionApk = async () : Promise<GithubVersion>  => {
    try{
        const {data} = await gitHubApiApk.get<GithubVersion>(`latest`);
        //console.log(data)
        return data;
    }catch(error){
        console.log(error)
        return getEmptyGithubVersion()
    }
}