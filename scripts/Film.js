
class Film{ // классы
    static films = [];

    constructor(name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster, id){
        this.name = name;
        this.country = country;
        this.genre = genre;
        this.directors = directors
        this.scenarist = scenarist;
        this.producer = producer;
        this.composer = composer;
        this.earnings = earnings;
        this.rating = rating;
        this.hrs = hrs;
        this.mins = mins;
        this.sec = sec;
        this.releasedate = releasedate;
        this.poster = poster;
        if (Film.films.length == 0){
            this.id = 0;
        } else {
            let tmpArray = copy(Film.films);
            tmpArray.sort((a, b) => (a.id> b.id ? 1 : -1));
            let maxId = tmpArray[tmpArray.length-1];
            let flag = true;
            for(let i = 0; i<Film.films.length; i++){
                let j = 0;
                for (; j<= maxId; j++){
                    if (Film.films[i].id == j){
                        flag = true;
                        break
                    }
                }
                if (flag)
                    continue;
                this.id = j;
                Film.films.push(this);
                return;
            }
            this.id = maxId +1;
            Film.films.push(this);
            return;
        }

        Film.films.push(this);
    }
}