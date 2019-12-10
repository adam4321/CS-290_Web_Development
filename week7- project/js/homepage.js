/************************************************************************
**  Description:  JS to create the slideshow on the homepage
************************************************************************/ 

// Render photos to the homepage carousel
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Increment the slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment the dot
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;

    // Keep the slide index within range
    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    // Change image every 4 seconds
    setTimeout(showSlides, 4000);
}

// Set the starting index and start the slideshow
let slideIndex = 0;
showSlides();
