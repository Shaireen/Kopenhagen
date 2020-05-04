/*Fetching the data for all galleries*/

const galleriesLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/photogallery?_embed";

const artEventsLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/art_event?_embed";

fetch(galleriesLink)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })

function showData(showGalleries) {
    console.log(showGalleries);


    showGalleries.forEach(showOneGallery);

    function showOneGallery(oneGallery) {
        const templateFeaturedGalleries = document.querySelector(".featured-galleries-template").content;
        const clone = templateFeaturedGalleries.cloneNode(true);
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
}


fetch(artEventsLink)
    .then(function (response) {
        return response.json()
    })
    .then(function (data2) {
        showData2(data2)
    })

function showData2(showArtEvents) {



    showArtEvents.forEach(showOneArtEvent);

    function showOneArtEvent(oneAE) {
        const templateFeaturedArtEvents = document.querySelector(".event-template").content;
        const clone2 = templateFeaturedArtEvents.cloneNode(true);
        // featured galleries section
        if (oneAE.featured == "yes") {
            clone2.querySelector(".one-event .AE-name").textContent = oneAE.event_name;
            clone2.querySelector(".one-event img").src = oneAE._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
            clone2.querySelector(".AE-type span").textContent = oneAE.type_of_event;

            // creating a button for each of featured gallery and giving it data-filter attribute with id of specific photogallery
            const buttonRead = document.createElement("button");
            buttonRead.setAttribute("data-filter", oneAE.id);
            buttonRead.classList.add("featured-AE-button");
            buttonRead.textContent = "See more...";
            clone2.querySelector(".one-event").appendChild(buttonRead);
            document.querySelector(".featured-events-grid").appendChild(clone2);
        }

    }
}

