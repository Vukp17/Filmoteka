export class Movies {

    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    key?: string | null;
    isRented?: boolean
    user?: string
    id?: string
    constructor(Title: string, Year: string, imdbID: string, Type: string, Poster: string,  isRented?: boolean,user?: string,id?: string) {
       this.Title=Title;
       this.Year = Year;
       this.imdbID= imdbID;
       this.Type = Type;
       this.Poster = Poster;
       this.isRented = isRented;
       this.user= user;
       this.id= id;
    }
}
