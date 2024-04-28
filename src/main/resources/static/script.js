let animeRanking = [];

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
        /*
        const mal_id = anime.mal_id;
        const titleOriginal = anime.title;
        const titleEnglish = anime.title_english;
        const releaseYear = anime.year;
        const url = anime.url;
        const imageURL = anime.images.jpg.large_image_url;
         */
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
        body: JSON.stringify(anime)
    })
        .then(response => {
        if(!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    })
        .then(data => {
        console.log("Anime successfully added to database: ", data);
    })
        .catch(error => {
        console.error("There was an error adding the anime to the database: ", error);
    });
}

