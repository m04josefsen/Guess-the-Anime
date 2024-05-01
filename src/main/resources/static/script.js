let animeRanking = [];
let currentScore = 0;
let inputCounter = 0;
let isLoggedIn = false;
let currentAccount = {

};

document.addEventListener('DOMContentLoaded', function() {
    fetchTopAnimes(1);
    fetchTopAnimes(2);
    fetchTopAnimes(3);
    addPlayButton();

    console.log('Document is ready');
});

function fetchTopAnimes(page) {
    //const url = "https://api.jikan.moe/v4/top/anime";
    const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;

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
        if(aniObject.titleEnglish != null) {
            addAnimeToDatabase(aniObject);
        }
        else {
            console.log("Anime title is null");
        }
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
    let print = "<button class='btn btn-primary' onclick='getRandomAnimes()'>" + "Play" + "</button>";

    if (isLoggedIn) {
        print += "<button class='btn btn-danger' onclick='logout()'>" + "Log out" + "</button>";
        print += "<button class='btn btn-secondary' onclick='seeStats()'>" + "See stats" + "</button>";
        print += "<div class='text-primary font-weight-bold'>You are currently logged in as: " + currentAccount.firstname + " " + currentAccount.lastname + "</div>";
    } else {
        print += "<button class='btn btn-primary' onclick='addCreateAccount()'>" + "Create account" + "</button>";
        print += "<button class='btn btn-primary' onclick='addLoginInputs()'>" + "Log in" + "</button>";
        print += "<div class='text-secondary'>You are currently playing as a guest</div>";
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
        print += "<div id='firstnameError'></div>"
        print += "<input class='form-control' id='lastnameInput' type='text' placeholder='Lastname'>";
        print += "<div id='lastnameError'></div>"
        print += "<input class='form-control' id='emailInput' type='text' placeholder='Email'>";
        print += "<div id='emailError'></div>"
        print += "<input class='form-control' id='passwordInput' type='text' placeholder='Password'>";
        print += "<div id='passwordError'></div>"
        print += "<input class='form-control' id='confirmPasswordInput' type='text' placeholder='Confirm Password'>";
        print += "<div id='confirmPasswordError'></div>"
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
        let print = "Your passwords do not match";
        print = print.fontcolor("RED");
        document.getElementById("confirmPasswordError").innerHTML = print;
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

        let print = "You have to write a valid name";
        print = print.fontcolor("RED");
        document.getElementById(type + "Error").innerHTML = print;

    }
    else {
        inputCounter++;
    }
}

function emailValidation(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)) {
        let print = "You have to write a valid email";
        print = print.fontcolor("RED");
        document.getElementById("emailError").innerHTML = print;
    }
    else {
        inputCounter++;
    }
}

function passwordValidation(password) {
    //Minimum 8 charchters, minimum 1 number, minimum 1 non letter or number
    const passwordPattern = /^(?=.*[\wÆØÅæøå])(?=.*[\d])(?=.*[\W_]).{8,}$/;

    if(!passwordPattern.test(password)) {
        let print = "Password needs to be min 8 characters long, min 1 number, min 1 special character";
        print = print.fontcolor("RED");
        document.getElementById("passwordError").innerHTML = print;
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
            let print = "<input class='form-control' id='emailLoginInput' type='text' placeholder='Email'>";
            print += "<input class='form-control' id='passwordLoginInput' type='text' placeholder='Password'>";
            document.getElementById("main-container").innerHTML = print;


        document.getElementById("emailLoginInput").value = account.email;
        document.getElementById("passwordLoginInput").value = account.password;

        login();
    })
        .catch(error => {
        console.error("There was an error while creating account: ", error);
    })
}

function seeStats() {
    let print = "<div>" + "" + "</div>";
    print += "<div>" + "" + "</div>";
    print += "<div>" + "" + "</div>";
    print += "<button class='btn btn-secondary' onclick='addPlayButton()'>" + "Back" + "</button>";

    document.getElementById("main-container").innerHTML = print;
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

    const image = "<img src='" + anime1.imageUrl + "' style='filter:blur(8px)'>";
    document.getElementById("image-container").innerHTML = image;

    let animeTitles = [anime1.titleEnglish, anime2.titleEnglish, anime3.titleEnglish, anime4.titleEnglish];
    animeTitles = animeTitles.sort(() => Math.random() - 0.5);

    let print = "";

    animeTitles.forEach(title => {
        print += "<button class='btn btn-primary' onclick='checkAnswer(\"" + anime1.titleEnglish + "\", \"" + title + "\", " + JSON.stringify(animeTitles) + ")'>" + title + "</button>";
    })

    document.getElementById("choice-container").innerHTML = print;
}

function checkAnswer(correctAnimeTitle, animeTitle, animeTitles) {
    const imageContainer = document.getElementById("image-container");
    const imgElement = imageContainer.querySelector("img");
    imgElement.style.filter = "none";

    let print = "";

    animeTitles.forEach(title => {
        if(title === correctAnimeTitle) {
            print += "<button class='btn btn-success' >" + title + "</button>";
        }
        else {
            print += "<button class='btn btn-secondary' >" + title + "</button>";
        }
    })

    if(animeTitle === correctAnimeTitle) {
        print += "<button class='btn btn-primary' onclick='getRandomAnimes()'>" + "Next" + "</button>";
        currentScore++;
    }
    else {
        print += "<button class='btn btn-danger' onclick='endScreen()'>" + "Back" + "</button>";
    }

    document.getElementById("choice-container").innerHTML = print;

}

function endScreen() {
    if(currentScore > currentAccount.highscore) {
        //TODO: må ha post for å oppdatere account, både på server og her
        currentAccount.highscore = currentScore;

        fetch("updateAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentAccount)
        })
            .then(response => {
            if(!response.ok) {
                throw new Error("Response was not ok");
            }
            return response.json();
        })
            .then(data => {
            //noe her
        })
            .catch(error => {
            console.error("There was an error while saving account: ", error);
        })

    }

    let print = "<button class='btn btn-danger' onclick='addPlayButton()'>" + "Go back" + "</button>";
    print += "<div>" + "Score: " + currentScore + "</div>";
    print += "<div>" + "Highscore: " + currentAccount.highscore + "</div>";

    resetMainContainer();
    document.getElementById("main-container").innerHTML = print;
    currentScore = 0;
}
