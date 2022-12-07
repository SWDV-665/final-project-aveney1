import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1PageHome } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1PageHome,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
