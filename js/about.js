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
        'Xin chào!',
        'Ciao!',
        'Szia!',
        'Namaste!',
        'Cześć!',
        'Kon\'nichiwa!',
        'Hyālō!',
        'Annyeong haseyo!'
    ];

    const greeting = document.getElementById('greeting'); 
    function changeGreeting() {
        //get random greeting
        greeting.textContent = greetings[Math.floor(Math.random()*greetings.length)];
    }

    setInterval(() => {
        changeGreeting();
    }, 400);

});