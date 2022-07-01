
// navbar scroll function an scroll to top button
let nav = document.querySelector('nav');
let mybutton = document.getElementById("btn-back-to-top");

window.addEventListener('scroll', function () {
if (window.pageYOffset > 300) {
    nav.classList.add('scrolled-down');
    mybutton.style.display = "block";

} else {
    nav.classList.remove('scrolled-down');
    mybutton.style.display = "none";
}
});
// Scroll to Top Button
//Get the button


// When the user scrolls down 20px from the top of the document, show the button


// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Text Animation
var options = {
    strings: ['<i>Hi.</i>', 'My name is <strong>Parva.</strong>', 'I am a <strong>Data Analyst.</strong>'],
    typeSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: false,
  };

  var typed = new Typed('.typed', options);

// carousel
  $('.carousel').carousel({
    interval: 15000,
    pause: true,
    ride: false,
  })

// skills chart


$(".ch-holder").one("mouseenter", function(e){
    $('.bar').each(function(i){  
        var $bar = $(this);
        $(this).append('<span class="count"></span>')
        setTimeout(function(){
          $bar.css('width', $bar.attr('data-percent'));      
        }, i*100);
      });
    
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).parent('.bar').attr('data-percent')
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now) +'%');
            }
        });
    });
  
});


