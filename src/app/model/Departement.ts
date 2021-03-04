import {Entreprise} from "./Entreprise";

export class Departement {
   constructor(public id?: number,
               public version?: number,
               public libelle?: string,
               public description?: string,
               public entreprise?: Entreprise) {
   }
}
