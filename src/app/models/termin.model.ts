import { Stanja } from '../enums/stanje-termina.enum';
import { Zakljucan } from '../enums/stanje-zakljucanosti.enum';
export class Termin {
  stanje: Stanja;
  datum: Date;
  zakljucan: Zakljucan;
  constructor(obj?: any) {
    this.stanje = (obj && obj.stanja) || Stanja.UGASEN;
    this.datum = (obj && obj.datum && new Date(obj.datum)) || new Date(0);
    this.zakljucan = Math.random() >= 0.5 ? Zakljucan.DA : Zakljucan.NE;
  }
}
