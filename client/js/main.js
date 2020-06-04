

let squareSize = 45;




let map = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,2,2,2,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,4,0,0,0,0,0,3,0,0,
    0,4,0,0,0,0,0,3,0,0,
    0,4,0,0,0,0,0,3,0,0,
    0,4,0,0,0,0,0,3,0,0,
    0,4,0,0,1,1,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
];



function updateStatus(newStatusText){
    $("#status").text(newStatusText);  
}


let numHitsToWin = getNumberOfShipsOnMap(map); 


buildMap(map);


$(".square").click(shoot);


async function saveScore(points){
    let name = prompt("What is your name?")
    let data = {
        name:name,
        points:points
    }
    const response = await fetch("/rest/scores", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let result = await response.json()
    console.log(result)
}
async function loadExampleList() {
    // Ladda in data ifrån databasen (via backend)
    let result = await fetch("/rest/scores")
    let scores = await result.json()
    renderExampleList(scores)
  }
  // Denna startar vi först så att vi laddar in listan på personer
  loadExampleList()
  
  function renderExampleList(scores) {
    let list = $("<ul/>")
    for (let score of scores) {
      list.append(`<li>${score.name}: ${score.points}</li>`)
    }
    $("main").html(list)
  }

function shoot(){
    console.log("shoot!");

    let id = $(this).attr('id');
    console.log(id);


    
    if (map[id] != 0){
        
        numHitsToWin--; 
        $(this).html(`<img src="Ship.jpg" width="45"/>`);  
        updateStatus("You hit it! Launch another!");
        
    }
    else{
        $(this).html(`<img src="None.jpg" width="45"/>`);
        updateStatus("Missed :( Try again!");
    }

    if (numHitsToWin<=0){
        updateStatus("Congratulations! You are a winner!");
        saveScore(20);
    }

}

/*ship1 = 3;
ship1;
shoot = $(this)//inte klar skjutfunktion
if(ship1<3){
    ship+=1;
    console.log("Shoot!");

}
if(ship1==3){
    console.log("ship1 föstört!");
}

ship2= 4;
ship2;
shoot = $(this)
if(ship2<4){
    ship+=1;
    console.log("Shoot!");

}
if(ship2==4){
    console.log("ship2 föstört!");
}



No.	Class of ship	Size
1	Carrier	5
2	Battleship	4
3	Cruiser	3
4	Submarine	3
5	Destroyer	2
*/
