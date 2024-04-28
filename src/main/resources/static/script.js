let animeRanking = [];

document.addEventListener('DOMContentLoaded', function() {
    fetchTopAnimes();
    addPlayButton();

    console.log('Document is ready');
});

function fetchTopAnimes() {
    const url = "https://api.jikan.moe/v4/top/anime";

    fetch(url, {
        method: "GET",
    })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            animeRanking = data.data;

            console.log("Fetched anime ranking: ", animeRanking);
            fetchAnimeInformation();
        })
        .catch(error => {
            console.error("There was an error while fetching data", error);
        })
}

function fetchAnimeInformation() {
    for(anime of animeRanking) {
        const aniObject = {
            malId : anime.mal_id,
            titleOriginal : anime.title,
            titleEnglish : anime.title_english,
            releaseYear : anime.year,
            url : anime.url,
            imageUrl : anime.images.jpg.large_image_url
        };

        addAnimeToDatabase(aniObject);
    }
}

function addAnimeToDatabase(anime) {
    fetch("/saveAnime", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anime)
    })
        .then(data => {
        console.log("Anime successfully added to database: ", data);
    })
        .catch(error => {
        console.error("There was an error adding the anime to the database: ", error);
    });
}

function addPlayButton() {
    //TODO: Må fikse noe med create account, enten her eller i addLoginInputs funksjonen

    let print = "<button class='btn btn-primary'>" + "Play" + "</button>";
    print += "<button class='btn btn-primary'>" + "Log in" + "</button>";
    print += "<button class='btn btn-danger'>" + "Log out" + "</button>";
    print += "<button class='btn btn-secondary'>" + "See stats" + "</button>";

    document.getElementById("main-container").innerHTML = print;
}

function addLoginInputs() {
    let print = "<input class='form-control' type='text' placeholder='Firstname'>";
    print += "<input class='form-control' type='text' placeholder='Lastname'>";
    print += "<input class='form-control' type='text' placeholder='Email'>";
    print += "<input class='form-control' type='text' placeholder='Password'>";

    document.getElementById("main-container").innerHTML = print;
}

function getAllAnimes() {
    fetch("/getAllAnimes", {
        method: "GET"
    }).then(response => {
        if(!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    }).then(animeList => {
        console.log(animeList);

        getRandomAnime(animeList);
    }).catch(error => {
        console.error("There was an error getting anime list: ", error);
    })
}

function getRandomAnime(animeList) {
    const randomAnime = animeList[randomNumber0to25()];
    console.log(randomAnime.titleEnglish);

    //TODO: IF STATEMENT IF DE != DE ANDRE SÅ GÅR DET BRA
    choice1Anime = animeList[randomNumber0to25()];
    choice2Anime = animeList[randomNumber0to25()];
    choice3Anime = animeList[randomNumber0to25()];


    displayBlurredAnime(randomAnime, choice1Anime, choice2Anime, choice3Anime);
}

function randomNumber0to25() {
    const randomNumber = Math.floor(Math.random() * 25);
    return randomNumber;
}

function displayBlurredAnime(anime, choice1, choice2, choice3) {
    const image = "<img src='" + anime.imageUrl +"' style='filter:blur(8px)'>";
    document.getElementById("image-container").innerHTML = image;

    let print = "<button class='btn btn-primary'>" + anime.titleEnglish + "</button>";
    print += "<button class='btn btn-primary'>" + choice1.titleEnglish + "</button>";
    print += "<button class='btn btn-primary'>" + choice2.titleEnglish + "</button>";
    print += "<button class='btn btn-primary'>" + choice3.titleEnglish + "</button>";

    document.getElementById("choice-container").innerHTML = print;
}
