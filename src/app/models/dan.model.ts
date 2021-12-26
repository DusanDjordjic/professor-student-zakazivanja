import { Termin } from './termin.model';

export class Dan {
  datum: Date;
  termini: Termin[];
  constructor(obj?: any) {
    this.datum = (obj && obj.datum && new Date(obj.datum)) || new Date(0);
    this.termini =
      (obj &&
        obj.termini &&
        obj.termini.map((termin: any) => new Termin(termin))) ||
      [];
  }
}
