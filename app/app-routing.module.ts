import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

// As rotas foram migradas para uma variável, mais fácil de se manter.
const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        // Ainda não sei o que o pathMatch faz
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },

    // A seguir, uma route com parâmetros, indicado pelos dois-pontos:
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    }
];

@NgModule({
    imports: [
        // Definição das rotas, de acordo com o endereço no navegador ou da
        // navegação por links
        // RouterModule.forRoot() recebe como parâmetro um array de objetos com
        // as propriedades path (string, que define o endereço a ser digitado
        // no navegador) e component, que indica qual componente será exibido
        // quando o endereço for buscado.
        //
        // RouterModule.forRoot retorna um módulo!!!! Mais especificamente, um
        // ModuleWithProviders, ou seja, inclui os providers utilizados.
        RouterModule.forRoot(routes)
    ],
    exports: [
        // É necessário estar nos exports também, visto que componentes de
        // outro módulo (AppModule, por exemplo) muitas vezes precisam usar 
        // diretivas do Router, como por exemplo RouterLink e RouterOutlet.
        RouterModule
    ]

    // É interessante notar que não há "declarations"! O que é lógico, já que
    // esse módulo só se preocupa com o routing da aplicação! Quem deve
    // administrar as "declarations" é o módulo que usará este módulo!
})
export class AppRoutingModule {

}