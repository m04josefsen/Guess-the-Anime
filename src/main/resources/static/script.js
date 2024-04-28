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
            addAnimesToDatabase();
        })
        .catch(error => {
            console.error("There was an error while fetching data", error);
        })
}

function addAnimesToDatabase() {
    for(anime of animeRanking) {
        let mal_id = anime.mal_id;
        let titleOriginal = anime.title;
        let titleEnglish = anime.title_english;
        let imageURL = anime.images.jpg.large_image_url;
        let url = anime.url;
        let releaseYear = anime.year;
    }
}

