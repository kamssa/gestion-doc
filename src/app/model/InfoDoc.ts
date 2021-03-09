import {Departement} from "./Departement";

export class InfoDoc {
  constructor(
    public id?: number,
    public version?: number,
    public  libelle?: string,
    public  nomDoc?: string,
    public  description?: string,
    public departement?: Departement,
    public idEntreprise?: number,
    public pathImage?: string

  ) {
  }
}
