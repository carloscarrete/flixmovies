import axios from "axios";

export const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_MOVIE_TOKEN}`
    }
});

export const image500 = (path: string) => `https://image.tmdb.org/t/p/w500/${path}`
export const image342 = (path: string) => `https://image.tmdb.org/t/p/w342/${path}`
export const image185 = (path: string) => `https://image.tmdb.org/t/p/w185/${path}`
