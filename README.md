# pwa-project
Ez lenni repository for pwa-project

## Amit tudni kell az alkalmazásról ##
- Egy saját API szerverről kér le rendszámokat és ahhoz tartozó adatokat az autóról, ezeket egy lenyíló expansion panel-en lehet megtekinteni
- A panel alján van egy gomb, amivel kedvencek közé lehet tenni, amivel elmenti az Indexed DB-be
- A kedvencek listát egy másik fülön lehet megtekinteni, ami betölti a db-ből ezeket
- Offline működik az alkalmazás, ahogy van reszponzivitása
- Jelenleg távolról nem érhető el az API szerver, nincs bebiztosítva még arra, hogy kívülről is elérhető legyen (fun fact: az API szerver itt található [sc4n1a471/NodeJS_Thingy](https://github.com/sc4n1a471/NodeJS-Thingy), illetve SwiftUI app is szintén van hozzá NodeJS_Thingy_SwiftUI néven)
- [YouTube videó a működésről](https://youtu.be/Y9DFM6lWHUI)
  - A frissítés nincs bemutatva, de az is működik, egy felugró ablak után frissül az oldal, ha új verziót lát
- Ami design/CSS szinten nem sikerült, az a mentett autók listája.
  - A háttér magassága nem teljesen okés. Ha beállítom 92vh-ra és overflow-y: scroll-ra, akkor nem bővül a magasság, ha több autó is van ott és összenyomják egymást
