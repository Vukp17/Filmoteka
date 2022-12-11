import { Movie } from "./movie.model";

export class Rent {

    rentId?: string;
    movieId: Movie;
    userId: string;
    date?: string;

    constructor(rentId: string,movieId: Movie, userId: string, date: string) {
       this.rentId = rentId
       this.movieId = movieId
       this.userId = userId
       this.date = date
    }

}