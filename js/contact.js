document.addEventListener('DOMContentLoaded', () => {

    const greetings = [
        'Get to know me!',
        'Reach out!',
        'Come find me!',
        'Let\'s get acquainted!',
        'Get familiar!',
        'Contact me!',
        'Send a message!'
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