document.addEventListener('DOMContentLoaded', () => {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       const page = document.getElementById('about');
       page.style.height = 'auto';
    }

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
        'Annyeong haseyo!',
        'Salve!',
        'Salut!',
        'Olá!',
        'Asalaam alaikum!'
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