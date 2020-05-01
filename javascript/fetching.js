const artistsLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/artist?_embed";
fetch(artistsLink)
   .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })

function showData(showArtists) {
    console.log(showArtists);


    showArtists.forEach(showOneArtist);

    var clone;

    function showOneArtist(oneArtist) {
        const templateFeaturedArtists = document.querySelector(".featured-artists-template").content;
        clone = templateFeaturedArtists.cloneNode(true);
        if (oneArtist.featured == "yes") {
        clone.querySelector(".one-artist .artist-style span").textContent = oneArtist.art_style;
        clone.querySelector(".one-artist .artist-name").textContent = oneArtist.artist_name;
        clone.querySelector(".one-artist img").src = oneArtist._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        const buttonRead = document.createElement("button");
        buttonRead.setAttribute("data-filter", oneArtist.id);
        buttonRead.classList.add("featured-artist-button");
        buttonRead.textContent = "Read more...";
        clone.querySelector(".one-artist").appendChild(buttonRead);
        document.querySelector(".featured-artists-grid").appendChild(clone);


   /*          const templateSelectedArtist2 = document.querySelector(".selected-artist-template2").content;
        const clone3 = templateSelectedArtist2.cloneNode(true);
        if (oneArtist.featured == "yes") {
        clone3.querySelector(".selected-artist-heading").textContent = oneArtist.artist_name;
        document.querySelector(".selected-artist").appendChild(clone3);
        }
           */

        const templateSelectedArtist = document.querySelector(".selected-artist-template").content;
        const clone2 = templateSelectedArtist.cloneNode(true);
        if (oneArtist.featured == "yes") {
        clone2.querySelector(".selected-artist-grid .selected-artist-photo img").src = oneArtist._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone2.querySelector(".selected-artist-text .artist-name").textContent = oneArtist.artist_name;
        /*clone2.querySelector(".selected-artist .selected-artist-heading").textContent = oneArtist.artist_name;*/
        clone2.querySelector(".selected-artist-text .artist-style span").textContent = oneArtist.art_style;
        clone2.querySelector(".selected-artist-text .artist-description").textContent = oneArtist.short_description;
        clone2.querySelector(".selected-artist-text .artist-contact span").textContent = oneArtist["e-mail"];
        clone2.querySelector(".selected-artist-grid").classList.add(oneArtist.id);
        clone2.querySelector(".selected-artist-grid").classList.add("hide");
        document.querySelector(".selected-artist").appendChild(clone2);
        }


        }

    }


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

}
