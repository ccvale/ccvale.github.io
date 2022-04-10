document.addEventListener('DOMContentLoaded', () => {

    
    const greetings = [
        'Get to know me!',
        'Send me an email!',
        'Reach out!',
        'Come find me!',
        
    ]

    const greeting = document.getElementById('greeting'); 
    function changeGreeting() {
        greeting.textContent = greetings[Math.floor(Math.random()*greetings.length)];
    }

    setInterval(() => {
        changeGreeting();
    }, 400);

});