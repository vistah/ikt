import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import {VisualComponent} from "./visual/visual.component";

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  {path: 'visual', component: VisualComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
