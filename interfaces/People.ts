import { Result } from "./Movies";

export interface People {
    adult:                boolean;
    also_known_as:        string[];
    biography:            string;
    birthday:             string;
    deathday:             null;
    gender:               number;
    homepage:             string;
    id:                   number;
    imdb_id:              string;
    known_for_department: string;
    name:                 string;
    place_of_birth:       string;
    popularity:           number;
    profile_path:         string;
}

export interface PeopleCredits {
    cast: Result[];
    crew: any[];
    id:   number;
}

export interface CastCredits {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage | string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    character:         string;
    credit_id:         string;
    order:             number;
}

export enum OriginalLanguage {
    En = "en",
}
