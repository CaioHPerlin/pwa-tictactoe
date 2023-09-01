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
const fields = [... game.children];

let player = 'x';
let plays = 0;

const playerSwap = () => player = player == 'x'? 'o' : 'x'; 

const reset = () => {
    plays = 0;
    playerSwap();
    fields.map(field => field.innerHTML = "");
}
const win = (player) => {
    alert(player + ' é o vencedor!');
    reset();
}
const tie = () => {
    alert('empate!');
    reset();
}

//Check Win Logic
const checkWin = () => {
    for(let y = 0; y < 3; y++){
        for(let x = 0; x < 3; x++){
            //Horizontal
            const fx1 = fields[0+y*3].innerHTML;
            const fx2 = fields[1+y*3].innerHTML;
            const fx3 = fields[2+y*3].innerHTML;

            if(fx1 != '' && fx2 != '' && fx3 != ''){
                if(fx1 == fx2 && fx2 == fx3){
                    return win(fx1)
                }
            }

            //Vertical
            const fy1 = fields[0+x].innerHTML;
            const fy2 = fields[3+x].innerHTML;
            const fy3 = fields[6+x].innerHTML;

            if(fy1 != '' && fy2 != '' && fy3 != ''){
                if(fy1 == fy2 && fy2 == fy3){
                    return win(fy1)
                }
            }
        }
    }

    //Diagonals
    const f4 = fields[4].innerHTML;

    const f0 = fields[0].innerHTML;
    const f8 = fields[8].innerHTML;

    const f2 = fields[2].innerHTML;
    const f6 = fields[6].innerHTML;

    if(f4 != ''){
        if(f0 != '' && f8 != ''){ //Left -> Right
            if(f0 == f4 && f4 == f8){
                return win(f0)
            }
        }else if(f2 != '' && f6 != ''){ //Right -> Left
            if(f2 == f4 && f4 == f6){
                return win(f2)
            }
        }
    }
    
    plays++;
    if(plays == 9) return tie();
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