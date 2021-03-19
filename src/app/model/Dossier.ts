import {Departement} from "./Departement";

export class Dossier {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public description?: string,
              public departement?: Departement,
              public idEntreprise?: number) {
  }
}
