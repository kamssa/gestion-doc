import {Adresse} from "./Adresse";
import {Manager} from "./Manager";

export class Entreprise {
  constructor(public id?: number,
              public version?:number,
              public nom?: string,
              public description?: string) {
  }
}
