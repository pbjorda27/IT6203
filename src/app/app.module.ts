import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,  HttpClientJsonpModule } from '@angular/common/http';
import { InspirationService } from './inspiration.service';
import { AddInspirationComponent } from './add-inspiration/add-inspiration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { Navigation1MenuComponent } from './navigation1-menu/navigation1-menu.component';
import { Navigation2MenuComponent } from './navigation2-menu/navigation2-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListInspirationComponent } from './list-inspiration/list-inspiration.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { SearchInspirationComponent } from './search-inspiration/search-inspiration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListSkillsComponent } from './list-skills/list-skills.component';;
import { AddSkillFormComponent } from './add-skill-form/add-skill-form.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from './event.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { HomepageComponent } from './homepage/homepage.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VideoSearchComponent } from './video-search/video-search.component';
import { SkillsService } from './skills.service';
import { Navigation3MenuComponent } from './navigation3-menu/navigation3-menu.component';

const appRoutes: Routes = [
  {
  path: '', 
  component: HomepageComponent
}, {
  path: 'addInspiration',   
  component: AddInspirationComponent
}, {
  path: 'homePage',
  component: HomepageComponent
}, {
  path: 'searchInspiration', 
  component: SearchInspirationComponent
}, {
  path: 'listInspiration', 
  component: ListInspirationComponent
}, {
  path: 'editInspiration/:_id', 
  component: AddInspirationComponent
}, {
  path: 'addEvent',
  component: NewEventFormComponent,
}, {
  path: 'editEvent/:_id',
  component: NewEventFormComponent,
}, {
  path: 'listEvents',
  component: ListEventsComponent,
}, {
  path: 'video-search',
  component: VideoSearchComponent
}, {
  path: 'listskills',  //when skills listed 
  component: ListSkillsComponent
}, {
  path: 'addskills',  //when skills added
  component: AddSkillFormComponent
}, {
  path: 'editskill/:_id', //when students edited 
  component: AddSkillFormComponent 
},{
  path: '**', 
  component: NotFoundComponent,
},

];

@NgModule({
  declarations: [
    AppComponent,
    AddInspirationComponent,
    NavigationMenuComponent,
    Navigation1MenuComponent,
    Navigation2MenuComponent,
    Navigation3MenuComponent,
    ListInspirationComponent,
    SearchInspirationComponent,
    AddSkillFormComponent,
    ListSkillsComponent,
    NotFoundComponent,
    NewEventFormComponent,
    ListEventsComponent,
    HomepageComponent,
    VideoSearchComponent
    ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [InspirationService, EventService, SkillsService],
  bootstrap: [AppComponent]

})
export class AppModule { }
