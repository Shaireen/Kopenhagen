/*Fetching the data for all artists*/

const artistsLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/artist?_embed";
fetch(artistsLink)
   .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })

function showData(showGalleries) {
    console.log(showGalleries);


    showGalleriess.forEach(showOneGallery);

    var clone;

    function showOneGallery(oneGallery) {
        const templateFeaturedGalleries = document.querySelector(".featured-artists-template").content;
        clone = templateFeaturedGalleriess.cloneNode(true);
        /* featured artists section */
        if (oneGallery.featured == "yes") {
       /* clone.querySelector(".one-artist .artist-style span").textContent = oneGa.art_style;*/
        clone.querySelector(".one-gallery .gallery-name").textContent = oneGallery.gallery_name;
        clone.querySelector(".one-gallery img").src = oneGallery._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        const buttonRead = document.createElement("button");
        buttonRead.setAttribute("data-filter", oneGallery.id);
        buttonRead.classList.add("featured-gallery-button");
        buttonRead.textContent = "Read more...";
        clone.querySelector(".one-gallery").appendChild(buttonRead);
        document.querySelector(".featured-galleries-grid").appendChild(clone);
        }


   /*          const templateSelectedArtist2 = document.querySelector(".selected-artist-template2").content;
        const clone3 = templateSelectedArtist2.cloneNode(true);
        if (oneArtist.featured == "yes") {
        clone3.querySelector(".selected-artist-heading").textContent = oneArtist.artist_name;
        document.querySelector(".selected-artist").appendChild(clone3);
        }
           */

        /*selected artists - hidden by default */

        const templateSelectedArtist = document.querySelector(".selected-artist-template").content;
        const clone2 = templateSelectedArtist.cloneNode(true);
        if (oneArtist.featured == "yes") {
        clone2.querySelector(".selected-artist-grid .selected-artist-photo img").src = oneArtist._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone2.querySelector(".selected-artist-text .artist-name").textContent = oneArtist.artist_name;
        clone2.querySelector(".selected-artist-text .artist-style span").textContent = oneArtist.art_style;
        clone2.querySelector(".selected-artist-text .artist-description").textContent = oneArtist.short_description;
        clone2.querySelector(".selected-artist-text .artist-contact span").textContent = oneArtist["e-mail"];
        clone2.querySelector(".selected-artist-grid").classList.add(oneArtist.id);
        clone2.querySelector(".selected-artist-grid").classList.add("hide");
        document.querySelector(".selected-artist").appendChild(clone2);
        }


        const templateAlphabetArtist = document.querySelector(".artist-alphabet-template").content;
        const clone3 = templateAlphabetArtist.cloneNode(true);
        clone3.querySelector(".one-artist-alphabet .artist-photo img").src = oneArtist._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone3.querySelector(".one-artist-alphabet .artist-name").textContent = oneArtist.artist_name;
        clone3.querySelector(".artist-style span").textContent = oneArtist.art_style;
        clone3.querySelector(".one-artist-alphabet .artist-description").textContent = oneArtist.short_description;
        clone3.querySelector(".one-artist-alphabet .artist-contact span").textContent = oneArtist["e-mail"];
        const firstLetter = oneArtist.artist_name.charAt(0);
        console.log(firstLetter);
        clone3.querySelector(".one-artist-alphabet").classList.add(firstLetter);
        document.querySelector(".artists-sorting-grid").appendChild(clone3);



        }




/* functions for showing the selected artist */

document.querySelectorAll('.featured-artist-button').forEach(button => {
    button.addEventListener('click', function () {
        console.log(button.dataset.filter)
        featuredArtistFilter(button.dataset.filter)
        console.log(button);
    })
})

function featuredArtistFilter(id) {
    document.querySelectorAll(".selected-artist-grid").forEach(oneArtist => {
        if (oneArtist.classList.contains(id)) {
            oneArtist.classList.remove('hide')
            oneArtist.classList.add("fade-in")
        } else {
            oneArtist.classList.add('hide')
        }
    })
}

document.querySelectorAll('.alphabet-filter-button').forEach(button => {
    button.addEventListener("click", function() {
        console.log(button.dataset.filter)
        alphabeticArtistFilter(button.dataset.filter)

    })
})

function alphabeticArtistFilter(letter) {
    document.querySelectorAll(".one-artist-alphabet").forEach(oneArtist => {
        document.querySelector(".artist-specific-letter-heading").textContent = "ARTISTS '" + letter + "'";
        if (oneArtist.classList.contains(letter)) {
            oneArtist.classList.remove("hide")
            oneArtist.classList.add("fade-in")

        } else {
            oneArtist.classList.add("hide")
        }

    })
}

document.querySelector(".all").addEventListener("click", showAllArtists);

function showAllArtists() {
    document.querySelector(".artist-specific-letter-heading").textContent = "ALL";
    document.querySelectorAll(".one-artist-alphabet").forEach(oneArtist => {
        oneArtist.classList.remove("hide")
        oneArtist.classList.add("fade-in")
    })


}

}
