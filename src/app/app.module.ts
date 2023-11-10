import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InspirationService } from './inspiration.service';
import { AddInspirationComponent } from './add-inspiration/add-inspiration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListInspirationComponent } from './list-inspiration/list-inspiration.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { SearchInspirationComponent } from './search-inspiration/search-inspiration.component';

const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: SearchInspirationComponent
}, {
  path: 'addInspiration',  //when inspiration added 
  component: AddInspirationComponent
}, {
  path: 'searchInspiration', //when inspiration is searched
  component: SearchInspirationComponent
}, {
  path: 'listInspiration',  //when inspiration listed
  component: ListInspirationComponent
}, {
  path: 'editInspiration/:_id', //when inspiration edited 
  component: AddInspirationComponent 
}, {
  path: '**',  //when path cannot be found
  component: NotFoundComponent
}, 
   
];

@NgModule({
  declarations: [
    AppComponent,
    AddInspirationComponent,
    NavigationMenuComponent,
    ListInspirationComponent,
    SearchInspirationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [InspirationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
