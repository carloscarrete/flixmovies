import { Cast } from '../interfaces/Cast';
import { MovieDetail, Movies, Result } from '../interfaces/Movies';
import { CastCredits, People, PeopleCredits } from '../interfaces/People';

export const getEmptyMovieDetail = (): MovieDetail => ({
    adult: false,
    backdrop_path: '',
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
});

export const getEmptyMoviesDetail = (): Movies => ({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
})

export const getEmptyMovieCastDetail = (): Cast => ({
    id: 0,
    cast: [],
    crew: []
})

export const getEmptyPeople = (): People => ({
    adult: false,
    also_known_as: [],
    biography: '',
    birthday: '',
    deathday: null,
    gender: 0,
    homepage: '',
    id: 0,
    imdb_id: '',
    known_for_department: '',
    name: '',
    place_of_birth: '',
    popularity: 0,
    profile_path: ''
})

export const getEmptyCastCredits = (): CastCredits => ({
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    character: '',
    credit_id: '',
    order: 0
})

export const getEmptyMovieResult = (): PeopleCredits => ({
    cast: [],
    crew: [],
    id: 0
})

enum Genders {
    NotSet = 0,
    Female = 1,
    Male = 2,
    NonBinary = 3
}

export const getGender = (gender: number): string | undefined => {
    return Object.keys(Genders).find(key => Genders[key as keyof typeof Genders] === gender);
}

export const noImageToShow600 = () :string => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019'
export const noImageToShow342 = () :string => 'https://via.placeholder.com/342x512'