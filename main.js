let igraci = [];
let kombinacija = [];
let brojevi = [];
let pobednici = [];
let trenutni_pobednici = [];
let flag = false;
let g_index = 1;
let player_index = 1;

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

clearError=()=>{
  setTimeout(()=>{
    $(".error").text("");
  },2500);
}

for(let i = 0; i < 36; i++)
  brojevi.push(i+1);

brojevi = shuffle(brojevi);

function linear_search(x, n){  
  for(let i = 0; i < n; i++){
      if(brojevi[i] == x)
        return true;
  }
  return false;
}

makeTable = (tableID, first, last)=>{
  tableID = document.getElementById(tableID);
    let newRow = tableID.insertRow(-1);
    let newCell = newRow.insertCell(0);
    let newCell1 = newRow.insertCell(1);
    let newText = document.createTextNode(`${first}`);
    let newText1 = document.createTextNode(`${last}`);
    newCell.appendChild(newText);
    newCell1.appendChild(newText1);
 }

$("document").ready(()=>{
  $("#sacuvaj").on('click', ()=>{
    let flag = false;
    let ime = $("#ime");
    let numbers = [$(".num1"), $(".num2"), $(".num3"), $(".num4"), $(".num5"),
                   $(".num6")];

    for(let i = 0; i < 6; i++){
      if(!(0 < numbers[i].val() && numbers[i].val() < 37)){
        numbers[i].css('color', 'red');
        flag = true;
      }
    }    

    if(ime.val()==""){
      $(".error").text("Igrač mora imati ime!").css('color','red');
      clearError();
      return;
    }

    let check = numbers.map(e=> e.val());

    check.sort();
    if(check[0] != ""){
      for(let i = 0; i < 5; i++){
        if(check[i] === check[i+1]){
          $(".error").text("Brojevi moraju biti međusobno različiti!").css('color','red');
          clearError();
          return;
        }
      }
    }
    

    if(flag){
      $(".error").text("Brojevi moraju biti u intervalu [1,36] i nijedno polje ne sme biti prazno!").css('color', 'red');   
      clearError();
      return;
      }else{
        igraci.push([ime.val(), numbers[0].val(), numbers[1].val(), numbers[2].val(),
        numbers[3].val(), numbers[4].val(), numbers[5].val() ]);

        for(let i = 0; i < 6; i++){
          $(`.num${i+1}`).css('color','black');
        }

        $(".igraci").append(`<h2>${player_index}. ${ime.val()} <span class='add ${6*(player_index-1)}'>${numbers[0].val()}</span>
        <span class='add ${6*(player_index-1)+1}'>${numbers[1].val()}</span> <span class='add ${6*(player_index-1) +2}'>${numbers[2].val()}</span> <span class='add ${6*(player_index-1) +3}'>${numbers[3].val()}</span>
        <span class='add ${6*(player_index-1) + 4}'>${numbers[4].val()}</span> <span class='add ${6*(player_index-1) + 5}'>${numbers[5].val()}</span></h2>`);
        
        player_index++;

        for(let i = 0; i < 6; i++){
          $(`.num${i+1}`).val("");
        }


        
        ime.val("");
        $(".error").text("Igrač prijavljen!").css('color','green');
        clearError();
//        console.log(igraci);
    }
  });

  $("#izvuci").on('click', ()=>{
     console.log(trenutni_pobednici);

      if(igraci.length == 0){
       $(".error").text('Prijavite igrače za igru!').css('color', 'red');
       clearError();
       return false;
      }
      
      if(trenutni_pobednici.length > 0){
        $(".error").text('Igra je vec završena, kliknite na dugme igraj opet da ponovo igrate!').css('color', 'red');
        clearError();
        return false;
      } 

      let flag1 = false;
      
      $(".brojevi").append(`<span class='add'>${brojevi[g_index-1]}</span>`);
      
      let testFlag = true;
      let matchingNumbers;
      
      for(let i = 0; i < igraci.length; i++){
        matchingNumbers = 0;
        for(let j = 1; j < 7; j++){
          if(linear_search(igraci[i][j], g_index)){
           matchingNumbers++;
           $(`.${6*i + j - 1}`).addClass('selected');
          }
        }
        console.log(matchingNumbers);
        if(matchingNumbers == 6){
          trenutni_pobednici.push(igraci[i]);
          flag1 = true;
        }
      }
  
      if(flag1){
          $(".brojevi").html("");
          $(".pobednik").html("");
          $('#trenutni_pobednici').html("");
          if(trenutni_pobednici.length > 1){
            $(".pobednik").html("<h2>Trenutni pobednici su: </h2>");
          } else $(".pobednik").html("<h2>Trenutni pobednik je: </h2>");
          
          for(let q = 0; q < trenutni_pobednici.length; q++){
            $(".pobednik").append(`<h2>${q+1}. ${trenutni_pobednici[q][0]},
            sa kombinacijom:
            ${trenutni_pobednici[q][1]},  
            ${trenutni_pobednici[q][2]},  
            ${trenutni_pobednici[q][3]},  
            ${trenutni_pobednici[q][4]},  
            ${trenutni_pobednici[q][5]},  
            ${trenutni_pobednici[q][6]}</h2>`);
            
            pobednici.push(trenutni_pobednici[q]);
          }
  //        console.log("pobednici: " + pobednici);
      }else{
        g_index++;
      }  
  });

  $("#pobednici").on('click',()=>{
    $(".pobednik").html("");
      for(let i = 0; i < pobednici.length + 1; i++){
        if(!flag){
          makeTable("trenutni_pobednici", "Pobednici", "Kombinacije");
          flag = true;
          continue;
        }
        let name=pobednici[i-1][0];
        let array = pobednici[i-1].slice(1, 7);
        makeTable("trenutni_pobednici", name, array);
      }
    });

  $("#ponovo").on('click', ()=>{
    $(".igraci").html("");
    player_index = 1;
    g_index = 1;
    clicked = false;
    flag = false;
    $(".pobednik").text(""); 
    igraci.splice(0, igraci.length);
    trenutni_pobednici.splice(0, trenutni_pobednici.length);
    brojevi = shuffle(brojevi);
    $('#trenutni_pobednici').html("");
  });
});
