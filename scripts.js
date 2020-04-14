let grid = [];

colors = ["#0051ba", "#e8000d"]; //KU Blue/Crimson
teams = ["blue", "red"]
window.addEventListener("DOMContentLoaded", ()=>{
  let turn = 0;

  for(let i = 0; i < 7; i++){

    grid.push([]);
    for(let j = 0; j < 6; j++){
      grid[i].push("-");
    }
  }
  for(let i = 0; i < 6; i++){
    for(let j = 0; j < 7; j++){
      document.body.innerHTML += "<div class=\"square\" id = \"" + j + i + "\"></div>";
    }
    document.body.innerHTML += "<br>";
  }
  for(let i = 0; i < 7; i++){
    document.body.innerHTML += "<button type=\"button\" id =\"" + i + "\">";
  }
  document.body.innerHTML += "<p id=\"turn\">Turn 1: blue</p>";
  document.addEventListener("click", (e)=>{
    if(e.target.type == "button" && e.target.id != "computer"){
      if(drop((turn)%2,parseInt(e.target.id),grid,0)){
        turn++;
        document.getElementById("turn").innerText = "Turn " + turn + ": " + teams[(turn) % 2];
        if(checkWin("0",grid)){
          alert("Blue Wins! Red is bad.");
          location.reload();
        }
        if(checkWin("1",grid)){
          alert("Red Wins! Blue is bad.");
          location.reload();
        }
      }

    }
  })
})

function drop(symbol, slot, board, isComp){
  if(board[slot][5] != "-"){
    return(0)
  }
  else{
    let cur = 5;
    while(board[slot][cur-1] == "-" && cur > 0){
      cur--;
    }
    board[slot][cur] = symbol;
    cur = 5-cur;
    if(!isComp){
      document.getElementById(slot + "" + cur).style.backgroundColor = colors[symbol];
    }
    return(1);
  }

}

function checkWin(symbol, board){
  for(let row = 0; row < 6; row++){
    for(let col = 0; col < 7; col++){
      let j = col;
      let i = row;
      if(board[j][i] == symbol){
        let cur = 1;
        while(j + 1 < 7 && board[j+1][i] == symbol){
          cur += 1;
          if(cur == 4){
            return(true);
          }
          j += 1;
        }
        cur = 1
        j = col
        i = row
        while(i + 1 < 6 && board[j][i+1] == symbol){
          cur += 1
          if(cur == 4){
            return(true);
          }
          i += 1;
        }
        cur = 1;
        j = col;
        i = row;
        while(i + 1 < 6 && j + 1 < 7 && board[j+1][i+1] == symbol){
          cur += 1;
          if(cur == 4){
            return(true);
          }
          i += 1;
          j += 1;
        }
        cur = 1;
        j = col;
        i = row;
        while(i + 1 < 6 && j - 1 > 0 && board[j-1][i+1] == symbol){
          cur += 1;
          if(cur == 4){
            return(true);
          }
        i += 1;
        j -= 1;
      }
    }
  }
}
}
