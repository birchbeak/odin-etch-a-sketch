//script.js

const startSize=16;


let prettyDiv= document.querySelector('#prettyDiv');
let resetButton= document.querySelector('#reset');


gridSetup(startSize);
resetButton.addEventListener('click', ()=>{
    resetPage();
});



function gridSetup(size){
    prettyDiv.innerHTML='';
    let container= new Array(size);
    let arr= Array.from(Array(size), ()=>new Array(size));

    for (let i=0; i<size; i++){
        container[i]= document.createElement('div');
        container[i].classList.add('container');
        prettyDiv.appendChild(container[i]);
        for (let k=0; k<size; k++){
            arr[i][k] = document.createElement('div');
            arr[i][k].classList.add('node');
            container[i].appendChild(arr[i][k]);
            arr[i][k].addEventListener('mouseover', ()=>{
                nodeEvent(arr[i][k]);
            })
        }
    }
}

function nodeEvent(node){
    if (node.getAttribute('data-rgb') === null) {
            node.setAttribute('data-rgb', randomColor().toString());
            node.setAttribute('style', `background-color: rgb(${node.getAttribute('data-rgb')})`);
            return 0;
    }
    node.setAttribute('data-rgb',darkenColor(node.getAttribute('data-rgb'),30));
    node.setAttribute('style', `background-color: rgb(${node.getAttribute('data-rgb')})`);
}

function resetPage(){
    let newSize= prompt('Enter a new size');
    if (isNaN(newSize)) {
        alert('Not a number'); 
        return 1;
    }
    else newSize = +newSize;
    if (newSize < 1) newSize=1;
    if (newSize > 100) newSize=100;
    gridSetup(newSize);
}

function randomColor(){
    let rgb = new Array(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
    return rgb;
}

function darkenColor(color, dark){
    let arr= color.split(',');
    console.log(arr);
    arr[0]= +arr[0] - dark
    arr[1]= +arr[1] - dark
    arr[2]= +arr[2] - dark
    if((arr[0]-=dark) <0) arr[0]=0;
    if((arr[1]-=dark) <0) arr[1]=0;
    if((arr[2]-=dark) <0) arr[2]=0;
    console.log(arr);
    return arr.toString();
}