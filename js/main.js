// создание поля
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// создание 100 ячеек
for(let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

// присваивание координатов ячейкам

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (let i = 0; i < excel.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x),
    excel[i].setAttribute('posY', y);
    x++;
}

// создание змеи

function geterateSnake() {
    let snakeX = Math.round(Math.random()*(10 - 3) + 3);
    let snakeY = Math.round(Math.random()*(10 - 3) + 3);
    return [snakeX, snakeY];
}

let snakeCoordinates = geterateSnake();

let snakeBody = [document.querySelector('[posX = "'  + snakeCoordinates[0] + '"][posY = "'  + snakeCoordinates[1] + '"]'),
document.querySelector('[posX = "'  + (snakeCoordinates[0] - 1) + '"][posY = "'  + snakeCoordinates[1] + '"]'),
document.querySelector('[posX = "'  + (snakeCoordinates[0] - 2) + '"][posY = "'  + snakeCoordinates[1] + '"]'),
];

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

// создание точки 
let mouse;

function createMouse() {
    function generateMouse(){
        let mouseX = Math.round(Math.random()*(10 - 1) + 1);
        let mouseY = Math.round(Math.random()*(10 - 1) + 1);
        return [mouseX, mouseY];
    }

    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "'  + mouseCoordinates[0] + '"][posY = "'  + mouseCoordinates[1] + '"]');
    while(mouse.classList.contains('snakeBody')) {
        mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "'  + mouseCoordinates[0] + '"][posY = "'  + mouseCoordinates[1] + '"]');
    }
    mouse.classList.add('mouse');
}

createMouse();

// движение змеи

let direction = 'right',
    steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
    display: block;
    background: transparent;
    text-align: center;
    color: white;
    border: none;
    margin: auto;
    margin-top: 40px;
    font-size: 30px;
`;

let score = 0;
input.value = `Ваши очки: ${score}`;

function move() {
    let coordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();
    if (direction == 'right') {
        if (coordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "'  + (+coordinates[0]+1) + '"][posY = "'  + coordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "'  + coordinates[1] + '"]'));
        }
    } else if(direction == 'left') {
        if (coordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "'  + (+coordinates[0] - 1) + '"][posY = "'  + coordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "'  + coordinates[1] + '"]'));
        }
    } else if(direction == 'up') {
        if (coordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "'  + coordinates[0] + '"][posY = "'  + (+coordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "'  + coordinates[0] + '"][posY = "1"]'));
        }
    } else if(direction == 'down') {
        if (coordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "'  + coordinates[0] + '"][posY = "'  + (+coordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "'  + coordinates[0] + '"][posY = "10"]'));
        }
    }

    let button = document.createElement('button'),
        text = document.querySelector('.text'),
        scoreText = document.createElement('div');

    
    
        

    if(snakeBody[0].classList.contains('snakeBody')) {
        input.style.display = 'none';
        mouse.style.display = 'none';
        document.body.appendChild(button);
        document.body.appendChild(button);
        button.innerHTML = 'Начать заново';
        button.classList.add('button');
        button.style.display = 'block';
        text.style.display = 'block';
        document.body.appendChild(scoreText);
        scoreText.classList.add('score');
        scoreText.innerHTML = `Вы набрали очков: ${score}`;
        clearInterval(interval);
        snakeBody[0].style.background = 'red';
    }

    button.addEventListener('click', function(){
        location.reload();

    });


    // проверка на совпадение координатов головы с координатами мыши

    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX'),
            b = snakeBody[snakeBody.length - 1].getAttribute('posY');
            snakeBody.push(document.querySelector('[posX = "'  + a + '"][posY = "'  + b + '"]'));
            mouse.classList.remove('mouse');
            score++;
            input.value = `Ваши очки: ${score}`;
            createMouse();
    }   

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
        
    }

    steps = true;
}


let interval = setInterval(move, 150); // здесь можно добавить уровень сложности

// обработчик события при нажатии на стрелки

window.addEventListener('keydown', function(e){

    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
          } else if (e.keyCode == 38 && direction != 'down') {
              direction = 'up';
              steps = false;
          }else if (e.keyCode == 39 && direction != 'left') {
              direction = 'right';
              steps = false;
          }else if (e.keyCode == 40 && direction != 'up') {
              direction = 'down';
              steps = false;
          }
    }
});

//