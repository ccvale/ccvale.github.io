document.addEventListener('DOMContentLoaded', () => {

    
    const greetings = [
        'Hi!',
        'Hej!',
        'Привет!',
        'Ahoj!',
        'Guten Tag!',
        'Salam!',
        'Γειά σου!',
        'Buna!',
        'שלום!',
        'Hallo!',
        'Bonjour!',
        'Hola!',
        'Xin chào!'
    ]

    const greeting = document.getElementById('greeting'); 
    function changeGreeting() {
        console.log(greeting);
        greeting.textContent = greetings[Math.floor(Math.random()*greetings.length)];
    }

    setInterval(() => {
        changeGreeting();
    }, 400);

});