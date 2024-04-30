let animeRanking = [];
let currentScore = [];
let inputCounter = 0;
let isLoggedIn = false;
let currentAccount = {

};

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

    let print = "<button class='btn btn-primary' onclick='getRandomAnimes()'>" + "Play" + "</button>";
    //TODO: if loggedin så må den bli fjerna eller deaktivert, kanksje alert pop up
    print += "<button class='btn btn-primary' onclick='addCreateAccount()'>" + "Create account" + "</button>";
    print += "<button class='btn btn-primary' onclick='addLoginInputs()'>" + "Log in" + "</button>";
    print += "<button class='btn btn-danger' onclick='logout()'>" + "Log out" + "</button>";
    print += "<button class='btn btn-secondary'>" + "See stats" + "</button>";

    if(isLoggedIn) {
        print += "<div>" + "You are currently logged in as: " + currentAccount.firstname + " " + currentAccount.lastname;
        print += "</div>";
    }

    resetMainContainer();
    document.getElementById("main-container").innerHTML = print;
}

function addLoginInputs() {
    if(!isLoggedIn) {
        let print = "<input class='form-control' id='emailLoginInput' type='text' placeholder='Email'>";
        print += "<input class='form-control' id='passwordLoginInput' type='text' placeholder='Password'>";
        print += "<button class='btn btn-primary' onclick='login()'>" + "Log in" + "</button>";
        print += "<button class='btn btn-secondary' onclick='addPlayButton()'>" + "Back" + "</button>";

        resetMainContainer();
        document.getElementById("main-container").innerHTML = print;
    }
    else {
        alert("You are already logged in!");
    }
}

function login() {
    const email = document.getElementById("emailLoginInput").value;
    const password = document.getElementById("passwordLoginInput").value;

    const url = "/login";
    const data = {
        email: email,
        password: password
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Response was not ok");
            }
            return response.json();
        })
        .then(data => {
            isLoggedIn = true;
            currentAccount = data;
            addPlayButton();
        })
        .catch(error => {
            console.error("There was a problem while fetching data", error);
        });

}

function logout() {
    if(isLoggedIn) {
        isLoggedIn = false;
        currentAccount = {}
        addPlayButton();
    }
    else {
        alert("You are not logged in");
    }
}

function addCreateAccount() {
    if(!isLoggedIn) {
        let print = "<input class='form-control' id='firstnameInput' type='text' placeholder='Firstname'>";
        print += "<input class='form-control' id='lastnameInput' type='text' placeholder='Lastname'>";
        print += "<input class='form-control' id='emailInput' type='text' placeholder='Email'>";
        print += "<input class='form-control' id='passwordInput' type='text' placeholder='Password'>";
        print += "<input class='form-control' id='confirmPasswordInput' type='text' placeholder='Confirm Password'>";
        print += "<button class='btn btn-primary' onclick='validateInputs()'>" + "Create Account" + "</button>";
        print += "<button class='btn btn-secondary' onclick='addPlayButton()'>" + "Back" + "</button>";

        resetMainContainer();
        document.getElementById("main-container").innerHTML = print;
    }
    else {
        alert("You are already logged in!");
    }
}

function validateInputs() {
    //TODO: MÅ LAGE ERROR MESSAGE; HELTS GJENNOM BOOTSTRAP
    stringValidation(document.getElementById("firstnameInput").value, "firstname");
    stringValidation(document.getElementById("lastnameInput").value, "lastname");
    emailValidation(document.getElementById("emailInput").value);
    passwordValidation(document.getElementById("passwordInput").value);

    if(document.getElementById("passwordInput").value === document.getElementById("confirmPasswordInput").value){
        inputCounter++;
    }
    else {
        //feilmelding her
    }


    if(inputCounter === 5) {
        createAccount();
        //TODO: EMPTY INPUT FIELDS HERE
    }
    else {
        //TODO: add error thingy here
    }
}

function stringValidation(string, type) {
    const namePattern = /^[a-zA-ZæøåÆØÅ]+$/;

    if(!namePattern.test(string)) {
        /*
        let out = "You have to write a valid name";
        out = out.fontcolor("RED");
        document.getElementById(type + "Error").innerHTML = out;
         */
    }
    else {
        inputCounter++;
    }
}

function emailValidation(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)) {
        /*
        let out = "You have to write a valid email";
        out = out.fontcolor("RED");
        document.getElementById("emailError").innerHTML = out;
         */
    }
    else {
        inputCounter++;
    }
}

function passwordValidation(password) {
    //Minimum 8 charchters, minimum 1 number, minimum 1 non letter or number
    const passwordPattern = /^(?=.*[\wÆØÅæøå])(?=.*[\d])(?=.*[\W_]).{8,}$/;

    if(!passwordPattern.test(password)) {
        //NOE SKJER HER
    }
    else {
        inputCounter++;
    }

}

function createAccount() {
    const account = {
        email : document.getElementById("emailInput").value,
        firstname : document.getElementById("firstnameInput").value,
        lastname : document.getElementById("lastnameInput").value,
        password : document.getElementById("passwordInput").value,
        highscore : 0
    };

    fetch("saveAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account)
    }).then(response => {
        if(!response.ok) {
            throw new Error("Response was not ok");
        }
    })
        .then(data => {
        console.log("Account was successfully added to database: ", data);
        inputCounter = 0;
        addPlayButton();
    })
        .catch(error => {
        console.error("There was an error while creating account: ", error);
    })

}

function resetMainContainer() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.style.flexDirection = "column";
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
    let divs = "<div id='image-container'></div>";
    divs += "<div id='choice-container'></div>";
    const mainContainer = document.getElementById("main-container");

    mainContainer.style.flexDirection = "row";
    mainContainer.width = "auto";
    mainContainer.innerHTML = divs;

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
        print += "<button class='btn btn-primary' onclick='checkAnswer(\"" + anime1.titleEnglish + "\", \"" + title + "\")'>" + title + "</button>";
    })

    document.getElementById("choice-container").innerHTML = print;
}

function checkAnswer(correctAnimeTitle, animeTitle) {
    if(animeTitle === correctAnimeTitle) {
        currentScore++;
        getRandomAnimes();
    }
    else {
        if(isLoggedIn) {
            saveScore();
        }

        endScreen();
    }
}

function saveScore() {
    //ACCOUNT POST NOE
}

function endScreen() {
    /*
    fetch("/getHighscore", {

    });
     */

    let print = "<button class='btn btn-danger' onclick='addPlayButton()'>" + "Go back" + "</button>";
    print += "<div>" + "Score: " + currentScore + "</div>";
    print += "<div>" + "Highscore: " + "</div>";

    resetMainContainer();
    document.getElementById("main-container").innerHTML = print;
    currentScore = 0;
}
