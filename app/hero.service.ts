import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// A importação do método toPromise() é necessária para transformar o resultado
// de um http.get (que é Observable) em uma Promise.
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

    // URL para a Web API
    private heroesUrl = 'api/heroes';

    constructor(private http: Http) {

    }

    getHeroes(): Promise<Hero[]> {
        
        return this.http
            // http.get(url) retorna um Observable!
            .get(this.heroesUrl)
            // Como a aplicação já foi feita esperando uma Promise, aqui o
            // Observable é convertido em uma!
            .toPromise()
            // Aqui a (agora) Promise é resolvida! Como a resposta vem como
            // String, a função .json() é utilizada para tentar converter em
            // um JSON Object e então "emoldurá-lo" em um array de objetos do
            // tipo Hero.
            .then(response => response.json().data as Hero[])
            // Caso algum erro ocorra, a função handleError irá receber as
            // informações do erro.
            .catch(this.handleError);

    }

    getHero(id: number): Promise<Hero> {
        //return this.getHeroes()

            // Para explicar a arrow notation aqui, fica melhor falar primeiro 
            // da arrow de heroes.find.
            // Basicamente, lê-se assim: ache um item do array "heroes",
            // chame-o de "hero", e retorne-o se a propriedade "id" dele for
            // igual à variável "id" no escopo externo (isto é, o "id" enviado
            // como parâmetro na chamada da função getHero).
            //
            // O arrow externo é basicamente: chame a resposta do ".then",
            // chame-a de "heroes" e então aplique a função find (que foi
            // explicada acima).
            //
            // O código abaixo foi comentado pois uma nova versão da aquisição
            // de um Hero isolado, utilizando http, foi criada.
            //
            //.then(heroes => heroes.find(hero => hero.id === id))


            // Não tenho certeza, mas imagino que o que estive entre { } será
            // interpolado na String.
            // Assim, a url apontará para api/heroes/id, sendo id o valor
            // recebido como parâmetro dessa função (getHero).
            const url = `${this.heroesUrl}/${id}`;

            return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError);


    }


    // Essa função será chamada quando a chamada http.get apresentar erro.
    private handleError(error: any): Promise<any> {
        console.error('Um erro ocorreu', error);
        // Promise.reject é a função "irmã" da função Promise.resolve.
        // Faz a mesma coisa, mas em vez de servir para quando a Promise for
        // resolvida com sucesso, serve para quando um erro ocorre.
        return Promise.reject(error.message || error);
    }

}