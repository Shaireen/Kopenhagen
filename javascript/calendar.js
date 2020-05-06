window.addEventListener("DOMContentLoaded", init);

function init() {
    const eventsLink = "http://designhavn.dk/3Wordpress/wp-json/wp/v2/art_event?_embed";

    fetch(eventsLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
   /* document.querySelector("btn-today").addEventListener("click", showTodaysEvents);*/
}

/*function showTodaysEvents() {
    const today = new Date();
}*/

function showData(showEvents) {
    console.log(showEvents);



    showEvents.forEach(showOneEvent);

    var clone;

    function showOneEvent(oneEvent) {
        const templateEvents = document.querySelector(".events-template").content;
        clone = templateEvents.cloneNode(true);

        const templateFeaturedArtEvents = document.querySelector(".event-template").content;
        const clone2 = templateFeaturedArtEvents.cloneNode(true);
        // featured galleries section
        if (oneEvent.featured == "yes") {
            clone2.querySelector(".one-event .AE-name").textContent = oneEvent.event_name;
            clone2.querySelector(".one-event img").src = oneEvent._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
            clone2.querySelector(".AE-type span").textContent = oneEvent.type_of_event;

            // creating a button for each of featured gallery and giving it data-filter attribute with id of specific photogallery
          /*  const buttonRead = document.createElement("button");
            buttonRead.setAttribute("data-filter", oneAE.id);
            buttonRead.classList.add("featured-AE-button");
            buttonRead.textContent = "See more...";
            clone2.querySelector(".one-event").appendChild(buttonRead);*/
            document.querySelector(".featured-events-grid").appendChild(clone2);
        }

        clone.querySelector(".one-event-filter .artist-photo img").src = oneEvent._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone.querySelector(".one-event-filter .ev-name").textContent = oneEvent.event_name;
        clone.querySelector(".one-event-filter .s-date span").textContent = oneEvent.event_start_date;
/*        const ourDate = new Date(oneEvent.event_start_date);
        console.log(ourDate)
        const today = new Date();*/

        /*        let dateMil = Date.parse(oneEvent.event_start_date);
                console.log(dateMil)
                console.log(oneEvent.event_start_date)*/
        clone.querySelector(".e-date span").textContent = oneEvent.event_end_date;
        clone.querySelector(".desc").textContent = oneEvent.short_description;
        clone.querySelector(".location span").textContent = oneEvent.location;
        clone.querySelector(".op-time span").textContent = oneEvent.time;
        clone.querySelector(".one-event-filter").classList.add(oneEvent.city);
        document.querySelector(".filter-grid").appendChild(clone);

    }



    document.querySelectorAll('.flbutton').forEach(button => {
        button.addEventListener('click', function () {
            console.log(button.dataset.filter)
            locationFilter(button.dataset.filter)
            console.log(button);
        })
    })

    function locationFilter(city) {
        document.querySelectorAll(".one-event-filter").forEach(oneEvent => {
            document.querySelector(".specific-filter-heading").textContent = city;
            if (oneEvent.classList.contains(city)) {
                oneEvent.classList.remove('hide')
                oneEvent.classList.add("fade-in")
            } else {
                oneEvent.classList.add('hide')
                oneEvent.classList.remove("fade-in")
            }
        })
    }


    document.querySelector("#btn-today").addEventListener("click", showTodaysEvents);

    function showTodaysEvents() {
         const today = new Date();
         const today2 = today.setHours(0,0,0,0);
        document.querySelector(".specific-filter-heading").textContent = "TODAY";
        /*console.log(today2);*/
        document.querySelectorAll(".one-event-filter").forEach(oneEvent => {
           var sDate = oneEvent.querySelector(".s-date span").textContent;
            var sDate2 = Date.parse(sDate);
            var eDate = oneEvent.querySelector(".e-date span").textContent;
            var eDate2 = Date.parse(eDate);
            /*console.log(eDate2);*/
            if (eDate2 == today2 || (eDate2 > today2 && (sDate2 < today2 || sDate2 == today2))) {
                oneEvent.classList.add("fade-in")

            } else {
                oneEvent.classList.add('hide')
                oneEvent.classList.remove("fade-in")
            }


        })
    }

     const currentYear = new Date().getFullYear();
/*    console.log(currentYear)*/
    const currentMonth = new Date().getMonth();
   /* console.log(currentMonth)*/
    const currentMonthOne = currentMonth+1;
    var daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();

  /* console.log(daysInMonth);*/


    document.querySelector("#btn-month").addEventListener("click", showMonthsEvents);

    function showMonthsEvents() {
        const today = new Date();
         const today2 = today.setHours(0,0,0,0);
        const endOfMonth = currentYear + "-" + currentMonthOne + "-" + daysInMonth;
        const endOfMonth2 = Date.parse(endOfMonth);
/*        console.log(endOfMonth2)*/
        document.querySelector(".specific-filter-heading").textContent = "THIS MONTH";
             document.querySelectorAll(".one-event-filter").forEach(oneEvent => {
           var sDate = oneEvent.querySelector(".s-date span").textContent;
            var sDate2 = Date.parse(sDate);
            var eDate = oneEvent.querySelector(".e-date span").textContent;
            var eDate2 = Date.parse(eDate);
            /*console.log(eDate2);*/
            if (eDate2 == today2 || (eDate2 > endOfMonth2 && (sDate2 < endOfMonth2 || sDate2 == today2)) || (eDate2 > today2 && (sDate2 < endOfMonth2 || sDate2 == today2))) {
                oneEvent.classList.add("fade-in")
                oneEvent.classList.remove("hide")

            } else {
                oneEvent.classList.add('hide')
                oneEvent.classList.remove("fade-in")
            }


        })

    }


  document.querySelectorAll('.all').forEach(button => {
        button.addEventListener('click', function () {
            showAllEvents();
        })
    })

function showAllEvents() {
    document.querySelector(".specific-filter-heading").textContent = "ALL";
    document.querySelectorAll(".one-event-filter").forEach(oneEvent => {
        oneEvent.classList.remove("hide")
        oneEvent.classList.add("fade-in")
    })


}


}

document.querySelector("#btn-weekend").disabled = true;
document.querySelector("#btn-seven").disabled = true;
document.querySelector(".disabled").disabled = true;



/*
const date = new Date();
date.setHours(0,0,0,0);
*/
