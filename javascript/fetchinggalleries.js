/*Fetching the data for all galleries*/

const artistsLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/photogallery?_embed";
fetch(artistsLink)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })

function showData(showGalleries) {
    console.log(showGalleries);


    showGalleries.forEach(showOneGallery);

    var clone;

    function showOneGallery(oneGallery) {
        const templateFeaturedGalleries = document.querySelector(".featured-galleries-template").content;
        clone = templateFeaturedGalleries.cloneNode(true);
        // featured galleries section
        if (oneGallery.featured == "yes") {
            clone.querySelector(".one-gallery .gallery-name").textContent = oneGallery.event_name;
            clone.querySelector(".one-gallery img").src = oneGallery.main_photo.guid;
            clone.querySelector(".gallery-style a").src = oneGallery.hosted_by_link;
            clone.querySelector(".gallery-style a").textContent = oneGallery.hosted_by;

            // creating a button for each of featured gallery and giving it data-filter attribute with id of specific photogallery
            const buttonRead = document.createElement("button");
            buttonRead.setAttribute("data-filter", oneGallery.id);
            buttonRead.classList.add("featured-gallery-button");
            buttonRead.textContent = "See more...";
            clone.querySelector(".one-gallery").appendChild(buttonRead);
            document.querySelector(".featured-galleries-grid").appendChild(clone);
        }



        // selected galleries - hidden by default

        const templateSelectedGallery = document.querySelector(".selected-gallery-template").content;
        const clone2 = templateSelectedGallery.cloneNode(true);
        // featured galleries only - to avoid fetching excess data that isn't going to be used at this point
        if (oneGallery.featured == "yes") {
            clone2.querySelector(".selected-gallery-text .gallery-name").textContent = oneGallery.event_name;
            clone2.querySelector(".selected-gallery-text .gallery-style a").src = oneGallery.hosted_by_link;
            clone2.querySelector(".selected-gallery-text .gallery-style a").textContent = oneGallery.hosted_by;
            clone2.querySelector(".selected-gallery-text .gallery-start-date span").textContent = oneGallery.start_date;
            clone2.querySelector(".selected-gallery-text .gallery-end-date span").textContent = oneGallery.end_date;
            clone2.querySelector(".selected-gallery-grid").classList.add(oneGallery.id);
            // loop for fetching all photos for specific photogallery
            for (i = 0; i < oneGallery.photos.length; i++) {
                const newPhoto = document.createElement("img");
                newPhoto.src = oneGallery.photos[i].guid;
                clone2.querySelector(".photo-grid").appendChild(newPhoto);
            }
            clone2.querySelector(".selected-gallery-grid").classList.add("hide");
            document.querySelector(".selected-gallery").appendChild(clone2);
        }




        //fetching  data for all artists displayed under alphabet section (multiple photos not included)
        const templateAlphabetGallery = document.querySelector(".gallery-alphabet-template").content;
        const clone3 = templateAlphabetGallery.cloneNode(true);
        clone3.querySelector(".one-gallery-alphabet .gallery-photo img").src = oneGallery.main_photo.guid;
        clone3.querySelector(".one-gallery-alphabet .gallery-name").textContent = oneGallery.event_name;
        clone3.querySelector(".one-gallery-alphabet .gallery-style a").src = oneGallery.hosted_by_link;
        clone3.querySelector(".one-gallery-alphabet .gallery-style a").textContent = oneGallery.hosted_by;
        // creating a button for each div with artist, setting data-filter attribute - used to view more details about gallery later
        const buttonRead = document.createElement("button");
        buttonRead.setAttribute("data-filter", oneGallery.id);
        buttonRead.classList.add("alphabet-gallery-button");
        buttonRead.textContent = "See more...";
        clone3.querySelector(".one-gallery-alphabet").appendChild(buttonRead);
        // checking the first letter of the art event that the photogallery is dedicated to - this allows us to filter photogalleries by letter later
        const firstLetter = oneGallery.event_name.charAt(1);
        console.log(firstLetter);
        // adding the first letter of art event name as a class to specific gallery div
        clone3.querySelector(".one-gallery-alphabet").classList.add(firstLetter);
        document.querySelector(".galleries-sorting-grid").appendChild(clone3);


        // fetching all data for all galleries - including all photos
        const templateSelectedGallery2 = document.querySelector(".selected-gallery-template2").content;
        const clone4 = templateSelectedGallery2.cloneNode(true);
        clone4.querySelector(".selected-gallery-text2 .gallery-name").textContent = oneGallery.event_name;
        clone4.querySelector(".selected-gallery-text2 .gallery-style a").src = oneGallery.hosted_by_link;
        clone4.querySelector(".selected-gallery-text2 .gallery-style a").textContent = oneGallery.hosted_by;
        clone4.querySelector(".selected-gallery-text2 .gallery-start-date span").textContent = oneGallery.start_date;
        clone4.querySelector(".selected-gallery-text2 .gallery-end-date span").textContent = oneGallery.end_date;
        // add gallery id as a class for filtering purpose
        clone4.querySelector(".selected-gallery-grid2").classList.add(oneGallery.id);
        // loop for fetching all photos for specific photogallery
        for (i = 0; i < oneGallery.photos.length; i++) {
            const newPhoto = document.createElement("img");
            newPhoto.src = oneGallery.photos[i].guid;
            clone4.querySelector(".photo-grid").appendChild(newPhoto);
        }
        // hidden by default
        clone4.querySelector(".selected-gallery-grid2").classList.add("hide");
        document.querySelector(".selected-gallery2").appendChild(clone4);




    }




    // functions for showing the selected gallery from featured section, based on data-filter attribute with id
    document.querySelectorAll('.featured-gallery-button').forEach(button => {
        button.addEventListener('click', function () {
            console.log(button.dataset.filter)
            featuredGalleryFilter(button.dataset.filter)
            console.log(button);
        })
    })
// check if id on button of selected gallery matches the id class on div
    function featuredGalleryFilter(id) {
        document.querySelectorAll(".selected-gallery-grid").forEach(oneGallery => {// if yes, then make the div appear - fade-in class for making a smooth entrance
            if (oneGallery.classList.contains(id)) {
                oneGallery.classList.remove('hide')
                oneGallery.classList.add("fade-in")
            } else {
                //if not, the div should stay hidden
                oneGallery.classList.add('hide')
            }
        })
    }

// functions for showing the selected gallery from alphabet section, based on data-filter attribute with id
    document.querySelectorAll('.alphabet-gallery-button').forEach(button => {
        button.addEventListener('click', function () {
            console.log(button.dataset.filter)
            selectedGalleryFilter(button.dataset.filter)
            console.log(button);
        })
    })

// check if id on button of selected gallery matches the id class on div
    function selectedGalleryFilter(id) {
        document.querySelectorAll(".selected-gallery-grid2").forEach(oneGallery => {// change the h2 text
            document.querySelector(".gallery-specific-letter-heading").textContent = "SELECTED PHOTOGALLERY";
            // if yes, then make the div appear - fade-in class for making a smooth entrance
            if (oneGallery.classList.contains(id)) {
                oneGallery.classList.remove('hide')
                oneGallery.classList.add("fade-in")
            } else {
                //if not, the div should stay hidden
                oneGallery.classList.add('hide')
            }
        })
        //hide all basic divs from alphabet section to avoid unnecessary cluttering the space

        document.querySelectorAll(".one-gallery-alphabet").forEach(oneGallery => {
            oneGallery.classList.add("hide");
        })
    }


// functions for filtering the galleries by letter - name of gallery is the event name
    document.querySelectorAll('.alphabet-filter-button').forEach(button => {
        button.addEventListener("click", function () {
            console.log(button.dataset.filter)
            alphabeticGalleryFilter(button.dataset.filter)

        })
    })
// check if the div class contains chosen letter
    function alphabeticGalleryFilter(letter) {
        document.querySelectorAll(".one-gallery-alphabet").forEach(oneGallery => {// change h2 text to show user's choice, fx. photogalleries "a"
            document.querySelector(".gallery-specific-letter-heading").textContent = "PHOTOGALLERIES '" + letter + "'";
            //if div class contains the chosen letter, make the div appear
            if (oneGallery.classList.contains(letter)) {
                oneGallery.classList.remove("hide")
                oneGallery.classList.add("fade-in")

            } else {
                // if not, keep it hidden
                oneGallery.classList.add("hide")
            }

        }) // to make sure that all divs with full content are hidden
        document.querySelectorAll(".selected-gallery-grid2").forEach(oneGallery => {

            oneGallery.classList.add("hide")
            oneGallery.classList.remove("fade-in")
        })
    }

// function for showing all galleries in alphabet section
    document.querySelector(".all").addEventListener("click", showAllGalleries);

    function showAllGalleries() {
        // changing the h2 text to show user's choice - ALL
        document.querySelector(".gallery-specific-letter-heading").textContent = "ALL";
        document.querySelectorAll(".one-gallery-alphabet").forEach(oneGallery => {
            oneGallery.classList.remove("hide")
            oneGallery.classList.add("fade-in")
        })
        // hiding all divs with full content
        document.querySelectorAll(".selected-gallery-grid2").forEach(oneGallery => {

            oneGallery.classList.add("hide")
            oneGallery.classList.remove("fade-in")
        })


    }

}
