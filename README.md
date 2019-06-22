# Tombola

Zadatak:
Kreirati veb aplikaciju za unos i izvlačenje brojeva za tombolu. Na početnoj stranici aplikacije, napraviti polje za unos imena igrača i 6 brojeva od 1 do 36 pri čemu je moguće uneti više igrača i kombinacija. Klikom na dugme "Izvlačenje", nasumično se biraju i prikazuju brojevi sve dok se ne izvuku svi brojevi koje sadrži jedna od unetih kombinacija. Kada se izvuče jedna od unetih kombinacija, aplikacija bi trebalo da prikaže ime pobednika i dobitnu kombinaciju. Nakon toga, moguće je započeti novu igru ili pogledati listu pobednika svih prethodnih igara i njihovih kombinacija.


# Rešenje:

Pri pokretanju aplikacije sa leve strane se javljaju polja za moje socijalne mreze(facebook, instagram, linkedin) a u centru imamo polje za unos imena igrača, polja za unos kombinacija brojeva i skroz na dnu, dugmad za:
1) čuvanje imena igrača i njegovih kombinacija
2) prikazivanje pobednika
3) ponovno pokretanje igre
4) izvlačenje jednog po jednog broja.

Prilikom unosa podataka, može doći do sledećih poruka:
1) Ukoliko igrač unese ime a ne unese barem barem jedan od brojeva za pokretanje igre, dobiće poruku "Brojevi moraju biti u intervalu [1,36] i nijedno polje ne sme biti prazno!" i neće moći da nastavi igru.
2) Ukoliko igrač ima broj u kombinaciji koji je veći od 36 i manji od 1, dobiće poruku "Brojevi moraju biti u intervalu [1,36] i nijedno polje ne sme biti prazno!" i neće moći da nastavi igru. 
3) Ukoliko igrač unese kombinacije brojeva, a ne unese ime, dobiće poruku "Igrač mora imati ime!" i neće moći da nastavi igru.
4) Ukoliko igrač unese dva ista broja u kombinaciji, dobiće poruku "Brojevi moraju biti međusobno različiti!" i neće moći da nastavi igru.
5) Ukoliko su svi prethodni uslovi ispoštovani, igrač dobija poruku "Igrač prijavljen" i može da nastavi igru.
6) Ukoliko dođe do pokušaja izvlačenja brojeva, dok nema prijavljenih igrača, izlazi poruka: "Prijavite igrače za igru!"
7) Ukoliko dođe do pokušaja izvlačenja brojeva ili prijavljivanje igrača, nakon što je proglašen pobednik trenutne partije, izlazi poruka: "Igra je vec završena, kliknite na dugme igraj opet da ponovo igrate!".

Nakon prijavljivanja igrača, sa desne strane se pojavljuje njegovo ime sa njegovom odabranom kombinacijom. Kada je završena prijava svih igrača, igra može da počne, kliktanje dugmeta izvlačenje. Svaki put kada je izvučen broj koji se nalazi u kombinaciji jednog od igrača, taj broj dobije zelenu boju.
Kada svih 6 kombinacija brojeva igrača "pozelene", igrač biva proglašen pobednikom i njegovo ime i kombinacija bivaju prijavljeni.
Klikom na dugme "Prikaži Pobednike", dobijamo tabelarni prikaz imena igrača sa njiovim dobitnim kombinacijama.
Klikom na dugme "Igraj Opet", igra kreće ispočetka.
