import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { ResultsComponent } from './results/results.component';
import { FavoritesComponent } from './favorites/favorites.component';
// import { CurrentComponent } from './results/current/current.component';
// import { HourlyComponent } from './results/hourly/hourly.component';
// import { WeeklyComponent } from './results/weekly/weekly.component';

const routes: Routes = [
    { path: '', redirectTo: '/results', pathMatch: 'full'},
    { path: 'results', loadChildren: () => import(`./results/results.module`).then(m => m.ResultsModule)},
    { path: 'favorites', component: FavoritesComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

// @NgModule({
//     imports: [
//         RouterModule.forRoot(routes, {enableTracing: false })
//     ],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);

