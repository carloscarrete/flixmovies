import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchMoviesByTitle, fetchTopRated, fetchUpcoming } from '../services/actions'
import { getEmptyMoviesDetail } from '../constants/movies'
import { typeListMovie } from '../types/types'

interface Props {
    searchQuery: string,
    genre?: number,
    pageParam?: number,
    typeMovie: typeListMovie
}

export default function useInfiniteMovies({ searchQuery, pageParam, typeMovie, genre }: Props) {

    const fetchMovies = async ({ pageParam = 1 }) => {
        try {
            switch (typeMovie) {
                case 'upcoming':
                    return await fetchUpcoming(pageParam)
                    case 'topRated':
                    return await fetchTopRated(pageParam)
                default:
                    return getEmptyMoviesDetail()
            }
        } catch (error) {
            console.log(error)
            return getEmptyMoviesDetail()

        }


        /*   try {
              const data = await fetchMoviesByTitle(searchQuery, pageParam)
              return data;
          } catch (error) {
              console.log(error)
              return getEmptyMoviesDetail()
          } */
    }

    const fetchMovieBySearch = async ({ pageParam = 1 }) => {
        try {
            const data = await fetchMoviesByTitle(searchQuery, pageParam)
            return data;
        } catch (error) {
            console.log(error)
            return getEmptyMoviesDetail()
        }
    }

    const infiniteQuerySearch = useInfiniteQuery({
        queryKey: ['movies', searchQuery],
        queryFn: fetchMovieBySearch,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
        }

    })

    const infiniteQueryMovies = useInfiniteQuery({
        queryKey: ['movies', 'page', typeMovie],
        queryFn: fetchMovies,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
        }
    })

    /* TODO: Implementar switch o algo donde dependiendo el tipo o keyTitle, se haga una peticion a actions.ts para realizar la peticiónb */

    //console.log(infiniteQuery.data?.pages)

    return {
        infiniteQuerySearch,
        infiniteQueryMovies
    }

}