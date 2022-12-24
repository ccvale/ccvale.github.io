document.addEventListener('DOMContentLoaded', () => {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       const page = document.getElementById('contact');
       page.style.height = 'auto';
    }

    const greetings = [
        'Get to know me!',
        'Reach out!',
        'Come find me!',
        'Let\'s get acquainted!',
        'Contact me!',
        'Send a message!',
        'Send me an email!'
    ]

    const greeting = document.getElementById('greeting'); 
    function changeGreeting() {
        //get random greeting
        let random = Math.floor(Math.random()*greetings.length);
        greeting.textContent = greetings[random];
    }

    setInterval(() => {
        changeGreeting();
    }, 400);

});