export class Resultat<T> {

    constructor(public status: number,
                public messages: string[],
                public body: T
    ) {

    }


}
