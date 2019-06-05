let igraci = [];
let kombinacija = [];
let brojevi = [];
let pobednici = [];
let trenutni_pobednici = [];
let flag = false;

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
  },4000);
}

for(let i = 0; i < 36; i++)
  brojevi.push(i+1);

function linear_search(arr, x){  
  for(let i = 0; i < arr.length; i++){
      if(arr[i] == x)
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
      $(".error").text("Igrac mora imati ime!");
      clearError();
      return;
    }

    let check = numbers.map(e=> e.val());

    check.sort();
    if(check[0] != ""){
      for(let i = 0; i < 5; i++){
        if(check[i] === check[i+1]){
          $(".error").text("Brojevi moraju biti medjusobno razliciti!").css('color','red');
          clearError();
          return;
        }
      }
    }
    

    if(flag){
      $(".error").text("Brojevi moraju biti u intervali [1,36] i nijedno polje ne sme biti prazno!");   
      clearError();
      return;
      }else{
        igraci.push([ime.val(), numbers[0].val(), numbers[1].val(), numbers[2].val(),
        numbers[3].val(), numbers[4].val(), numbers[5].val() ]);

        for(let i = 0; i < 6; i++){
          $(`.num${i+1}`).css('color','black');
        }

        for(let i = 0; i < 6; i++){
          $(`.num${i+1}`).val("");
        }

        ime.val("");
        $(".error").text("Igrac prijavljen!").css('color','green');
        clearError();
        console.log(igraci);
    }
  });

  $("#izvuci").on('click', ()=>{
    brojevi = shuffle(brojevi);
    //console.log(brojevi);
    array = [];
    let flag = false;

    for(let i = 0; i < 6; i++){
      array.push(brojevi[i]); 
    }

    for(let i = 6; i < 36; i++){ 
      for(let k = 0; k < igraci.length; k++){
          for(let j = 0; j < 6; j++){
              if(!linear_search(array, igraci[k][j+1])){
                   break;
               }else if(j == 5){
                 trenutni_pobednici.push(igraci[k]);
                 flag = true;
                 break;
               }
           }
      }

      if(flag){
          $(".pobednik").html("");
          if(trenutni_pobednici.length > 1){
            $(".pobednik").html("<h4>Trenutni pobednici su: </h4>");
          } else $(".pobednik").html("<h2>Trenutni pobednik je: </h2>");
          
          for(let q = 0; q < trenutni_pobednici.length; q++){
            $(".pobednik").append(`<h2>${trenutni_pobednici[q][0]}</h2>`);
            pobednici.push(trenutni_pobednici[q]);
          }
          $(".pobednik").append("<h2>Dobitna kombinacija je: </h2>");
          $(".pobednik").append("<h3>"+
              `${trenutni_pobednici[0][1]}, ` +
              `${trenutni_pobednici[0][2]}, ` +
              `${trenutni_pobednici[0][3]}, ` +
              `${trenutni_pobednici[0][4]}, ` +
              `${trenutni_pobednici[0][5]}, ` +
              `${trenutni_pobednici[0][6]}` + "</h3>"
          );
          console.log(array);
          console.log("pobednici: " + pobednici);
          break;
      } 
      else{
        array.push(brojevi[i]);
        //console.log(array);
      }  
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
    flag = false;
    $(".pobednik").text(""); 
    trenutni_pobednici.splice(0, trenutni_pobednici.length);
    igraci.splice(0, igraci.length);
    shuffle(brojevi);
   // pobednici.splice(0, pobednici.length);
    $('#trenutni_pobednici').html("");
  });
});