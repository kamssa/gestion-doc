import {Adresse} from "./Adresse";
import {Personne} from "./Personne";
import {Departement} from "./Departement";

export class Admin extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public departement?: Departement,
              public adresse ?: Adresse,
              public  type?: string) {
              super(id, version, nom, prenom, email, password, fonction, nomComplet, departement, adresse, type);
  }
}
