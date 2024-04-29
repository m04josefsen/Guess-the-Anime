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

function getRandomAnimes() {
    fetch("getRandomAnimes", {
        method: "GET"
    })
        .then((response) => {
        if(!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    })
        .then(animeList => {
        console.log(animeList);

        displayQuestion(animeList);
    })
        .catch(error => {
        console.error("There was an error getting random animes list.");
    })
}

function displayQuestion(animeList) {
    const anime1 = animeList[0];
    const anime2 = animeList[1];
    const anime3 = animeList[2];
    const anime4 = animeList[3];

    const image = "<img src='" + anime1.imageUrl +"' style='filter:blur(8px)'>";
    document.getElementById("image-container").innerHTML = image;

    let animeTitles = [anime1.titleEnglish, anime2.titleEnglish, anime3.titleEnglish, anime4.titleEnglish];
    animeTitles = animeTitles.sort(() => Math.random() - 0.5);

    let print = "";

    animeTitles.forEach(title => {
        print += "<button class='btn btn-primary'>" + title + "</button>";
    })

    document.getElementById("choice-container").innerHTML = print;
}

