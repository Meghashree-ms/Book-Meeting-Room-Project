import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllMeetingsComponent } from './components/all-meetings/all-meetings.component';

// const routes: Routes = [];

const routes: Routes = [
  // { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allMeetings', component: AllMeetingsComponent },
  // { path: 'allProductsByType', component: ProductsByTypeComponent },
  // { path: 'editProduct', component:EditProductByNameComponent },
  // { path: 'deleteProduct', component:DeleteProductComponent },

  // { path: 'home',component:NavigationComponent},

  { path: '**', redirectTo: '/login' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
