import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    // Ao definir moduleId, o template indicado por templateUrl será carregado
    // de forma modular. Provavelmente é isso que torna necessário que os
    // templates HTML estejam na pasta indicada pela propriedade "app" do
    // objeto "map" do arquivo systemjs.config.js.
    // Nessa aplicação, como foi alterada o local destino dos arquivos .js
    // resultantes da compilação dos arquivo .ts de "app" para "dist/app",
    // é lá que deve-se colocar os templates HTML.
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [
        'dashboard.component.css'
    ]
})
export class DashboardComponent {

    heroes: Hero[] = [];

    constructor(private heroService: HeroService) {

    }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

}