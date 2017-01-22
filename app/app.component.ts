import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    
    // A propriedade "routerLink" aponta para o mesmo valor de "path" das rotas
    // incluídas pelo RouterModule.forRoot.
    // A única diferença é a presença (no routerLink) da barra inicial ("/")
    // antes do path da rota desejada.
    //
    // A diretiva <router-outlet> indica onde (no HTML) serão exibidos os
    // componentes buscados pela navegação.
    template: `
        <h1>{{title}}</h1>

        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        </nav>

        <router-outlet></router-outlet>
    `,

    styleUrls: [
        'app.component.css'
    ]
})
export class AppComponent {

    title = 'Tour of Heroes';

}