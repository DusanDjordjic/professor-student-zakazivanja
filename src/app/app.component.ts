import { Component, OnInit } from '@angular/core';
import { Dan } from './models/dan.model';
import { Termin } from './models/termin.model';
import { Stanja } from './enums/stanje-termina.enum';
import { Zakljucan } from './enums/stanje-zakljucanosti.enum';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  stanja = Stanja;
  zakljucan = Zakljucan;
  profesorovaCenaJednogCasa = 10;
  brojZakazanihCasova = 0;
  korisnik = '0';
  danasnjiDan = new Date(new Date().toLocaleDateString());
  nedelja: Dan[] = [];
  dan: { datum: Date; termini: any[] } = {
    datum: this.danasnjiDan,
    termini: [],
  };
  ngOnInit(): void {
    const danasnjiDan = new Date(new Date().toLocaleDateString());
    for (let d = 0; d < 7; d++) {
      this.nedelja.push(
        new Dan({
          datum: new Date(danasnjiDan.getTime() + 3600 * 1000 * 24 * d),
          termini: [],
        })
      );
      for (let i = 0; i < 9; i++) {
        this.nedelja[d].termini.push(
          new Termin({
            datum: new Date(this.dan.datum.getTime() + 3600 * 1000 * (12 + i)),
          })
        );
      }
    }

    console.log(this.nedelja);
  }
  promeniStanje(danIndex: number, terminIndex: number) {
    console.log({ korisnik: this.korisnik });
    if (
      this.nedelja[danIndex].termini[terminIndex].zakljucan ===
      this.zakljucan.DA
    ) {
      console.log('ZAKLJUCANO POLJE');
      return;
    }
    if (this.korisnik == '0') {
      if (
        this.nedelja[danIndex].termini[terminIndex].stanje === Stanja.UGASEN
      ) {
        this.nedelja[danIndex].termini[terminIndex].stanje = Stanja.SLOBODAN;
      } else if (
        this.nedelja[danIndex].termini[terminIndex].stanje === Stanja.SLOBODAN
      ) {
        this.nedelja[danIndex].termini[terminIndex].stanje = Stanja.UGASEN;
      }
    } else if (this.korisnik == '1') {
      console.log(this.nedelja[danIndex].termini[terminIndex].stanje);

      if (
        this.nedelja[danIndex].termini[terminIndex].stanje === Stanja.SLOBODAN
      ) {
        this.nedelja[danIndex].termini[terminIndex].stanje = Stanja.ZAKAZAN;
        this.brojZakazanihCasova++;
      } else if (
        this.nedelja[danIndex].termini[terminIndex].stanje === Stanja.ZAKAZAN
      ) {
        this.brojZakazanihCasova--;
        this.nedelja[danIndex].termini[terminIndex].stanje = Stanja.SLOBODAN;
      }
    }
  }
}
