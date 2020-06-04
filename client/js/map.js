
function buildMap(ourMap){
    
    for (let i=0; i<ourMap.length; i++) {
        
        $(".containerRow").append(`<div id=${i} 
        class="square"><img src="Sea.jpg" 
        width="${squareSize}"/></div>`);
    }
}


function getNumberOfShipsOnMap(ourMap){
    let numShips = 0;
    
    for (let square of ourMap){ 
        if (square>0){ 
            numShips++; 
        }
    }
    return numShips;
}
