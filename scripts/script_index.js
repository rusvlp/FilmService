import copy from './arrayCopyModule.js' 
import isValidDate from './isValidDateModule.js'

console.log("hi world");

function deleteFilm(id){
    console.log('deleted');
    console.log(id);
    let tmpArr = Film.films.filter((film) => {
        console.log(film.id == id);
        return film.id != id
    });
    
    document.querySelector(".content").innerHTML = "";
    Film.films = tmpArr;

    console.log(tmpArr);
    localStorage.setItem("films", JSON.stringify(tmpArr));
    
}

function addFilms(films){
    for (let i = 0; i<films.length; i++){
        let {name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster, id} = films[i];
        let direcorsString = "";
    
             for (let i = 0; i<directors.length; i++){
                if (i == directors.length - 1){
                       direcorsString+= directors[i]
                        break;
                  }
             direcorsString+= directors[i] + ", ";
        }

        let addFilmBlock = '<div class="moviecard">' +
        '<div class="movieName">'+ name +'</div>' +
        '<div class=>'+
        '    <img src="'+ poster +'" class = "imgsource" alt="постер '+ name +'">'+
        '</div>'+
        '<div class = "desc">Страна: '+ country +'</div>'+
        '<div class = "desc">Жанр: '+ genre +'</div>'+
        '<div class = "desc">Режиссеры: '+direcorsString+' </div>'+
        '<div class = "desc">Сценарист: '+ scenarist +'</div>'+
        '<div class = "desc">Продюсер: '+producer+'</div>'+
        '<div class = "desc">Композитор: '+composer+'</div>'+
        '<div class = "desc">Мировые сборы: '+earnings.toString()+'</div>'+
        '<div class = "desc">Рейтниг возраста: '+rating+'</div>'+
        '<div class="desc">Длительность: '+ hrs.toString() +':' + mins.toString() +':'+ sec.toString() +'</div>'+
        '<div class = "desc" style="margin-bottom: 10pt;">Дата выхода: '+ releasedate.getDate().toString()+ '.' + (releasedate.getMonth()+1).toString() + '.'+ releasedate.getFullYear().toString()+  '</div>'+
        '<div class="deleteBtn" id = "deleteBtn_'+ id +'" onclick="">'+
            '<div>Удалить</div>'+
        '</div>'+
        '<div class="deleteBtn" id = "revealInfo_'+ id +'">'+
            '<div>Информация</div>' +
        
        '</div>'+
        '</div>'
    document.querySelector(".content").innerHTML += addFilmBlock;
   
    }
    updateEventListeners(films);
}

class Comment{
    constructor(name, busytype, rating, textItself){
        this.name = name;
        this.busytype = busytype;
        this.rating = rating;
        this.textItself = textItself;
    }
}


class Film{ // классы
    static films = [];
    comments = [];

    constructor(name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster, id){
        this.name = name;
        this.country = country;
        this.genre = genre;
        this.directors = directors;
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
            console.log(this.id);
        } else {
            let tmpArray = copy(Film.films);
            tmpArray.sort((a, b) => (a.id> b.id ? 1 : -1));
            let maxId = tmpArray[tmpArray.length-1].id;
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
                console.log(this.id);
                Film.films.push(this);
                return;
            }
            this.id = maxId +1;
            console.log(this.id);
            Film.films.push(this);
            return;
        }

        Film.films.push(this);
    }
}







if (localStorage.getItem("films") != null){
    
    let tmp = JSON.parse(localStorage.getItem("films"));
    for (let i = 0; i<tmp.length; i++){
        let {name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster} = tmp[i];
        releasedate = new Date(releasedate);
        console.log(...tmp[i]);
       
        new Film(name, country, genre, directors, scenarist, producer, composer, earnings, rating, hrs, mins, sec, releasedate, poster)
        
        console.log(poster);

    }
    addFilms(Film.films);


}

let afdivrevealer = {
    directorsCount: 1,
    revealed: false,

    initialize: function(){
        afdivrevealer.directorsCount = 1;
        afdivrevealer.revealed = false;
        console.log(this.directorsCount)
    },

    afdivreveal: function(){
        console.log(this.revealed);
        let afdiv = document.querySelector(".addFilm")
        if (afdivrevealer.revealed){
            afdiv.style.display = "none";
            afdivrevealer.directorsCount = 1;
            let directors = document.querySelector(".directors");
            directors.innerHTML = '<label for="directorsName_'+ this.directorsCount +'">Имя режиссера</label>' +
                                  '<input required type="text" id="directorsName_'+ this.directorsCount +'">'
            afdivrevealer.revealed = false;
        } else {
            afdivrevealer.directorsCount = 1;
            afdiv.style.display = "block";
            afdivrevealer.revealed = true;
        }
    },

    addDirector: function(){
        afdivrevealer.directorsCount++;
        let directors = document.querySelector(".directors");
        directors.innerHTML += '<label for="direcorsName_'+ afdivrevealer.directorsCount +'">Имя режиссера</label>' +
                               '<input type="text" id="directorsName_'+ afdivrevealer.directorsCount +'">'
        
        console.log(afdivrevealer.directorsCount)
    }
}

afdivrevealer.initialize();

function addFilm(){
    console.log("функция отработала")
    let name = document.querySelector("#filmName").value;
    let country = document.querySelector("#country").value;
    let genre = document.querySelector("#genreSel").value;
    let directors = [];
    console.log(afdivrevealer.directorsCount)
    for (let i = 1; i<=afdivrevealer.directorsCount; i++){
        console.log("#directorsName_" + i + "");
        directors.push(document.querySelector("#directorsName_" + i + "").value);
        console.log(document.querySelector("#directorsName_" + i + ""));
    }
    let scenarist = document.querySelector("#scenarist").value;
    let producer = document.querySelector("#producer").value;
    let composer = document.querySelector("#composer").value;
    let earnings = document.querySelector("#earnings").value;
    let ratingAge = document.querySelector("#ratingAge").value;
    let hrs = parseInt(document.querySelector("#hrs").value);
    hrs = isFinite(hrs) ? hrs : 0;
    let mins = parseInt(document.querySelector("#mins").value);
    mins = isFinite(mins) ? mins : 0;
    let sec = parseInt(document.querySelector("#sec").value);
    sec = isFinite(sec) ? sec : 0;
    let dateOfRelease = new Date(document.querySelector("#dateOfRelease").value);
    let imageLink = document.querySelector("#imageLink").value;
    let film = new Film(name, country, genre, directors, scenarist, producer, composer, earnings, ratingAge, hrs, mins, sec, dateOfRelease, imageLink);
    localStorage.setItem("films", JSON.stringify(Film.films))
    console.log(dateOfRelease);

    let direcorsString = "";
    for (let i = 0; i<directors.length; i++){
        if (i == directors.length - 1){
            direcorsString+= directors[i]
            break;
        }
        direcorsString+= directors[i] + ", ";
    }
    console.log(direcorsString);
   
    let id = film.id;
    console.log(id);
    let addFilmBlock = '<div class="moviecard">' +
   '<div class="movieName">'+ name +'</div>' +
   '<div class=>'+
   '    <img src="'+ imageLink +'" class = "imgsource" alt="постер '+ name +'">'+
   '</div>'+
   '<div class = "desc">Страна: '+ country +'</div>'+
   '<div class = "desc">Жанр: '+ genre +'</div>'+
   '<div class = "desc">Режиссеры: '+direcorsString+' </div>'+
   '<div class = "desc">Сценарист: '+ scenarist +'</div>'+
   '<div class = "desc">Продюсер: '+producer+'</div>'+
   '<div class = "desc">Композитор: '+composer+'</div>'+
   '<div class = "desc">Мировые сборы: '+earnings.toString()+'</div>'+
   '<div class = "desc">Рейтниг возраста: '+ratingAge+'</div>'+
   '<div class="desc">Длительность: '+ hrs.toString() +':' + mins.toString() +':'+ sec.toString() +'</div>'+
   '<div class = "desc" style="margin-bottom: 10pt;">Дата выхода: '+ dateOfRelease.getDate().toString()+ '.' + (dateOfRelease.getMonth()+1).toString() + '.'+ dateOfRelease.getFullYear().toString()+  '</div>'+
   '<div class="deleteBtn" id = "deleteBtn_'+id+'">'+
         '<div>Удалить</div>'+
    '</div>' +
    '<div class="deleteBtn" id = "revealInfo_'+ id +'">'+
         '<div>Информация</div>' +
    
  '</div>'+
  '</div>'+
  '</div>'
 
  afdivrevealer.afdivreveal();
  document.querySelector(".content").innerHTML += addFilmBlock;
  console.log(".deleteBtn" + id);
  updateEventListeners(Film.films);
  
    

}



let sortRevealer = {
    revealed: false,
    element: document.querySelector(".sortElement"),

    initialize: function(){
        sortRevealer.revealed = false;
        sortRevealer.element = document.querySelector(".sortElement");
    },

    reveal: function(){
        if (sortRevealer.revealed){
            sortRevealer.element.style.display = "none";
            sortRevealer.revealed = false;
        } else {
            sortRevealer.element.style.display = "block";
            sortRevealer.revealed = true;
        }
        console.log(sortRevealer.revealed);
    }
}

sortRevealer.initialize();

function sortReset(){
    document.querySelector(".content").innerHTML = "";
    addFilms(Film.films);
    console.log('sort reset');
}

function executeSort(){
    let nameSort = document.querySelector("#filmNameSort").value;
    let country = document.querySelector("#countrySort").value;
    let genre = document.querySelector("#genreSelSort").value;
    let dorStart = new Date(document.querySelector("#dateOfReleaseStart").value);
    let dorEnd = new Date(document.querySelector("#dateOfReleaseEnd").value);
    let resArray = []
    resArray = Film.films.filter((film) => {
        console.log(!(nameSort != "" &&  nameSort != film.name))
        console.log(!(country != "Не выбрано" && country != film.country))
        console.log(!(genre != "Не выбрано" && genre != film.genre))
        console.log(!(!isValidDate(dorStart) && !isValidDate(dorEnd) && film.dateOfRelease <= dorStart && !film.dateOfRelese >= dorEnd))
        if (nameSort != "" &&  nameSort != film.name){
            return false;
        }   
        if (country != "Не выбрано" && country != film.country){
            return false;
        }    
        if (genre != "Не выбрано" && genre != film.genre){
            return false;
        }
        if (!isValidDate(dorStart) && !isValidDate(dorEnd) && film.dateOfRelease <= dorStart && !film.dateOfRelese >= dorEnd){
            return false;
        }
            
        return true;
    })
    document.querySelector(".content").innerHTML = "";
    addFilms(resArray);
    console.log(dorStart + " " + dorEnd);
    sortRevealer.reveal();
}

document.querySelector(".addfilmbtn").addEventListener('click', afdivrevealer.afdivreveal);
document.querySelector(".addDirectorBtn").addEventListener('click', afdivrevealer.addDirector);
document.querySelector(".addFilmFormForm").addEventListener('submit', addFilm)
document.querySelector(".sortBtnElement").addEventListener('click', sortRevealer.reveal)
document.querySelector(".sortReset").addEventListener('click', function(){sortReset(); sortRevealer.reveal()})


function updateEventListeners(arr){
    console.log("Event Listeners updated")
    console.log(arr);
    for (let i = 0; i<arr.length; i++){
        console.log(document.getElementById(`revealInfo_${arr[i].id}`));
        document.getElementById(`revealInfo_${arr[i].id}`).addEventListener('click', function() {revealInfo(arr[i].id)}, false)
        document.getElementById(`deleteBtn_${arr[i].id}`).addEventListener('click', function() {deleteFilm(arr[i].id)}, false)
    }
    
}

//deleteFilm(0);
console.log(Film.films);
console.log(document.getElementById("#deleteBtn_0"));

function revealInfo(id){
    document.querySelector(".filmDescCloseBtn").addEventListener('click', function (){closeInfo(id)}) 
    document.querySelector(".commentsBlock").innerHTML = "";
    document.querySelector(".filmInfo").style.display = "block";
    let film = Film.films.filter(film => film.id == id);
    film = film[0];
    document.querySelector(".descFilmInfo").innerHTML = film.name;
    document.querySelector(".imgsource").src = film.poster;
    document.querySelector(".desc1").innerHTML = "Страна: " + film.country;
    document.querySelector(".desc2").innerHTML = "Жанр: "+ film.genre;
    let direcorsString = "";
    
        for (let i = 0; i<film.directors.length; i++){
                if (i == film.directors.length - 1){
                       direcorsString+= film.directors[i]
                        break;
                  }
             direcorsString+= film.directors[i] + ", ";
        }
    document.querySelector(".desc3").innerHTML = "Режиссеры: " + direcorsString;
    document.querySelector(".desc4").innerHTML = "Сценарист: " + film.scenarist;
    document.querySelector(".desc5").innerHTML = "Продюсер: " + film.producer;
    document.querySelector(".desc6").innerHTML = "Композитор: " + film.composer;
    document.querySelector(".desc7").innerHTML = "Мировые сборы: " + film.earnings;
    document.querySelector(".desc8").innerHTML = "Рейтинг: " + film.rating;
    document.querySelector(".desc9").innerHTML = "Длительность: " + film.hrs.toString() +':' + film.mins.toString() +':'+ film.sec.toString()
    document.querySelector(".desc10").innerHTML = "Дата выхода: " + film.releasedate.getDate().toString() + "." + (film.releasedate.getMonth() + 1).toString() + "." + film.releasedate.getFullYear().toString();
    document.querySelector(".addCommentFormForm").addEventListener('submit', function(){addCommentToFilm(id)})
    console.log(film.comments);
    for (let i = 0; i<film.comments.length; i++){
        let name = film.comments[i].name;
        let busytype = film.comments[i].busytype;
        let rate = film.comments[i].rating;
        let text = film.comments[i].textItself;
        document.querySelector(".commentsBlock").innerHTML += `<div class="comment">
        <div class="cName">Имя: ${name}</div>
        <div class="cBusy">Род занятий: ${busytype}</div>
        <div сlass="cRate">Оценка фильму: ${rate}</div>
        <div class="cItself">Комментарий: ${text}</div>
        </div>`
    }
 }

function closeInfo(id){
    document.querySelector(".filmDescCloseBtn").removeEventListener('click', function (){closeInfo(id)}) 
    document.querySelector(".addCommentFormForm").removeEventListener('submit', function(){addCommentToFilm(id)});
    document.querySelector(".filmInfo").style.display = "none";
    
}

function openComment(){
    document.querySelector(".addCommentFormHolder").style.display = "block";
}

function closeComment(){
    document.querySelector(".addCommentFormHolder").style.display = "none";
}

function addCommentToFilm(id){
    let film = Film.films.sort((film) => (film.id == id))[0];
    let name = document.getElementById("commentatorName").value;
    let busytype = document.getElementById("busytype").value;
    let rating = document.getElementById("rateFilm").value;
    let textItself = document.getElementById("comItself").value;
    film.comments.push(new Comment(name, busytype, rating, textItself));
    console.log(film.comments);
    closeComment();
    document.querySelector(".commentsBlock").innerHTML = "";
    for (let i = 0; i<film.comments.length; i++){
        let name = film.comments[i].name;
        let busytype = film.comments[i].busytype;
        let rate = film.comments[i].rating;
        let text = film.comments[i].textItself;
        document.querySelector(".commentsBlock").innerHTML += `<div class="comment">
        <div class="cName">Имя: ${name}</div>
        <div class="cBusy">Род занятий: ${busytype}</div>
        <div сlass="cRate">Оценка фильму: ${rate}</div>
        <div class="cItself">Комментарий: ${text}</div>
        </div>`
    }
}



document.querySelector(".addCommentBack").addEventListener('click', closeComment)
document.querySelector(".addComment").addEventListener('click', openComment)
document.querySelector(".sortBack").addEventListener('click', sortRevealer.reveal)
document.querySelector(".sortFormForm").addEventListener('submit', executeSort);
