import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: [
        'heroes.component.css'
    ]   
})
export class HeroesComponent implements OnInit {
    
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private heroService: HeroService,
        private router: Router
    ) { }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    goToDetail(): void {
        // Para acionar a navegação dentro da "parte" javascript do componente,
        // usa-se router.navigate, enviando um array com 2 posições, EXATAMENTE
        // na mesma sintaxe daquela observada na tag <a> do
        // dashboard.component.html ([routerLink]="['/detail', hero.id]").
        // A primeira posição é a "raiz" de um caminho que espera um parâmetro,
        // e a segunda posição é o valor do parâmetro ('/detail/x', sendo x
        // enviado como o valor de this.selectedHero.id).
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}