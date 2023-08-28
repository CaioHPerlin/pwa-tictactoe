window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
}

const game = document.getElementById('game');

for(let y = 0; y < 3; y++){
    for(let x = 0; x < 3; x++){
        const field = document.createElement('h1');
        game.appendChild(field)
    }
}

let player = 'x';

const playerSwap = () => player = player == 'x'? 'o' : 'x'; 

const fields = [... game.children];

//Win Logic
const checkWin = () => {
    for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
            const fx1 = fields[0+y*3].innerHTML;
            const fx2 = fields[1+y*3].innerHTML;
            const fx3 = fields[2+y*3].innerHTML;

            if(fx1 != '' && fx2 != '' && fx3 != ''){
                if(fx1 == fx2 && fx2 == fx3){
                    return alert(fx1 + ' é o vencedor!')
                }
            }

            const fy1 = fields[0+x].innerHTML;
            const fy2 = fields[3+x].innerHTML;
            const fy3 = fields[6+x].innerHTML;

            if(fy1 != '' && fy2 != '' && fy3 != ''){
                if(fy1 == fy2 && fy2 == fy3){
                    return alert(fy1 + ' é o vencedor!')
                }
            }
        }
    }
}

//Play Logic
fields.map(field => {
    field.addEventListener('click', () => {
        if(field.innerHTML == ''){
            field.innerHTML = player;
            playerSwap();
            checkWin();
        }
    })
})