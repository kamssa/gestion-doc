import {Departement} from "./Departement";
import {Dossier} from "./Dossier";

export class InfoDoc {
  constructor(
    public id?: number,
    public version?: number,
    public  libelle?: string,
    public  nomDoc?: string,
    public  description?: string,
    public departement?: Departement,
    public dossier?: Dossier,
    public idEntreprise?: number,
    public pathImage?: string

  ) {
  }
}
