import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'; 

import { Hero } from './hero';
import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: [
        'hero-detail.component.css'
    ]
})

export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    // Como funciona:

    // "params", do tipo Params, que todo ActivatedRoute tem, implementa a
    // classe Observable. Buscamos os parâmetros enviados como parâmetros pelas
    // rotas da seguinte forma: params['nome_do_parametro']. Neste componente,
    // usa-se params['id'] para retornar o valor do parâmetro 'id' quando a
    // rota for chamada, isto é, quando for ativada (deve ser por isso que o
    // módulo se chama ActivatedRoute).
    //
    // O operador switchMap, nesse caso, mapeia um parâmetro retirado do
    // Observable "params" (o valor de 'id', no caso) e o utiliza no getHero,
    // que por sua vez retorna outro Observable (o resultado, nesse caso).
    // O operador "+" é utilizado para converter o params['id'] (que sempre
    // retorna o valor de um parâmetro no formato string) para número, que é
    // o tipo do parâmetro esperado por getHero().
    //
    // Finalmente, com o resultado (do tipo Observable) de getHero, é
    // necessário utilizar a função "subscribe", similar à função "then()" das
    // Promises, para resolver o retorno do Observable.

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero)
    }

    goBack(): void {
        // A função location.back() utiliza a pilha histórica do navegador para
        // voltar à página/view anterior.
        this.location.back();
    }
}