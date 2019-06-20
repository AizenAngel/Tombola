let igraci = []; //niz koji sadrži sve igrače, updejtuje se klikom na dugme
                // Sačuvaj

let kombinacija = []; //Ništa za sada :)

let brojevi = []; // trenutna kombinacija brojeva 36 brojeva.

let pobednici = []; // niz koji sadrži pobednike koji se prikazuju u tabeli
                    // trenutni_pobednici

let trenutni_pobednici = []; // niz koji sadrži trenutne pobednike tekuće igre

let flag = false; // polje koje koristimo da ispisujemo tabelu. Kada je flag = false
                  // ispisujemo head tabele, a inace ispisujemo jedan po jedan red.

let g_index = 1; // Koristi se da vidimo do kog poteza smo stigli. Updejtuje klikom na
                 // dugme Izvlačenje

let player_index = 1; // koliko igrača je prijavljeno u tekućoj igri

//funkcija koja meša elemente u nizu. Koristimo je za niz brojevi
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

//Briše feedback za greške koji se javlja prilikom neke nedozvoljene radnje,
// npr pokušaj prijave igrača bez imena, ili bez popunjenih svih brojeva.
clearError=()=>{
  setTimeout(()=>{
    $(".error").text("");
  },2500);
}


// dodajemo brojeve u niz
for(let i = 0; i < 36; i++)
  brojevi.push(i+1);

// mešamo niz
brojevi = shuffle(brojevi);

// linearno tražimo da li među prvih prijavljenih n elemenata niza brojevi,
// postoji dati element x
function linear_search(x, n){  
  for(let i = 0; i < n; i++){
      if(brojevi[i] == x)
        return true;
  }
  return false;
}

//funkcija koja pravi tabelu
// first je prvo polje koje dodajemo a last drugo(poslednje)
// prosleđujemo i ID tabele
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
  // na klik dugmeta Sačuvaj, proveravamo da li je pokušaj prijave igrača validan
  // Ako jeste, prijavljujemo ga i izbacujemo poruku da je igrač prijavljen i 
  // dodajemo ga u niz prijavljenih
  $("#sacuvaj").on('click', ()=>{
    let flag = false;
    let ime = $("#ime");
    let numbers = [$(".num1"), $(".num2"), $(".num3"), $(".num4"), $(".num5"),
                   $(".num6")];
    
    // ako neki od brojeva ispada iz intervala [1,36]:               
    for(let i = 0; i < 6; i++){
      if(!(0 < numbers[i].val() && numbers[i].val() < 37)){
        numbers[i].css('color', 'red');
        flag = true;
      }
    }    
    // ako ime nije popunjeno
    if(ime.val()==""){
      $(".error").text("Igrač mora imati ime!").css('color','red');
      clearError();
      return;
    }
    
    // proveravamo da li je igrač prijavio iste brojeve, obaveštavamo ga o tome
    // i čekamo da to promeni
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
    

    if(flag){ // ukoliko je došlo do greške
      $(".error").text("Brojevi moraju biti u intervalu [1,36] i nijedno polje ne sme biti prazno!").css('color', 'red');   
      clearError();
      return;
      }else{
        igraci.push([ime.val(), numbers[0].val(), numbers[1].val(), numbers[2].val(),
        numbers[3].val(), numbers[4].val(), numbers[5].val() ]);

        for(let i = 0; i < 6; i++){
          $(`.num${i+1}`).css('color','black');
        }
        
        // lista igrača u koju dodajemo igrača sa njihovim tekućim kombinacijama
        // klasa add se koristi za specijalan format brojeva, a klasa 
        // ${6*(player_index-1)+k} da bismo lakše obojili broj ako je izabran


        $(".igraci").append(`<h2>${player_index}. <span class='shortenName'>${ime.val()}</span> <span class='add ${6*(player_index-1)}'>${numbers[0].val()}</span>
        <span class='add ${6*(player_index-1)+1}'>${numbers[1].val()}</span> <span class='add ${6*(player_index-1) +2}'>${numbers[2].val()}</span> <span class='add ${6*(player_index-1) +3}'>${numbers[3].val()}</span>
        <span class='add ${6*(player_index-1) + 4}'>${numbers[4].val()}</span> <span class='add ${6*(player_index-1) + 5}'>${numbers[5].val()}</span></h2>`);
        //maxLen: 15;

        player_index++;
        
        //nakon što smo uspešno dodali igrača, brišemo sva sva input polja.

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
    // console.log(trenutni_pobednici);
      
      //ako nema prijavljenih igrača, igra ne može da krene, jer nema ko da igra
      if(igraci.length == 0){
       $(".error").text('Prijavite igrače za igru!').css('color', 'red');
       clearError();
       return false;
      }
      
      //ako su već određeni pobednici u tekućoj igri, nema potrebe da igra i dalje
      // traje
      if(trenutni_pobednici.length > 0){
        $(".error").text('Igra je vec završena, kliknite na dugme igraj opet da ponovo igrate!').css('color', 'red');
        clearError();
        return false;
      } 

      let flag1 = false;
      
      //dodajemo broj u listu brojeva
      $(".brojevi").append(`<span class='add'>${brojevi[g_index-1]}</span>`);
      
      //promenjiva koja broji koliko brojeva je svaki od igrača pogodio 
      let matchingNumbers;
      
      for(let i = 0; i < igraci.length; i++){
        matchingNumbers = 0;
        for(let j = 1; j < 7; j++){
          // svaki put kada dodamo novi broj, prolazimo kroz listu svih igrača 
          // i proveravamo koliko brojeva iz njihovih kombinacija se nalazi
          // u trenutno generisanoj. 
          if(linear_search(igraci[i][j], g_index)){
           matchingNumbers++;
           //animacija koja menja boju pola sekunde
            $( `.${6*i + j - 1}` ).animate({
             'background-color': "green"
           },500);
          }

        }
        
        //ako su svi brojevi iz kombinacije i-tog igrača nađeni, on je dodat u listu
        // trenutnih pobednika
        if(matchingNumbers == 6){
          trenutni_pobednici.push(igraci[i]);
          flag1 = true;
        }
      }
      
      // ako postoji barem jedan trenutni pobednik, dodajemo njega i njegovu 
      // kombinaciju brojeva u listu pobednika 
      if(flag1){
          // brišemo sadržaj div-a u kojem ćemo da prikazujemo pobednike
          $(".brojevi").html("");
          $(".pobednik").html("");
          $('#trenutni_pobednici').html("");
          if(trenutni_pobednici.length > 1){
            $(".pobednik").html("<h2>Trenutni pobednici su: </h2>");
          } else $(".pobednik").html("<h2>Trenutni pobednik je: </h2>");
          
          for(let q = 0; q < trenutni_pobednici.length; q++){
            $(".pobednik").append(`<h2 class='winner'>${q+1}. ${trenutni_pobednici[q][0]},
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
  
  //generišemo tabelu pobednika svih prethodnih igara
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
  
  //klikom na ovo dugme, sve se briše i igra kreće ponovo.
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
