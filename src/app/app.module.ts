import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from "@angular/material/toolbar";


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionsComponent} from './questions/questions.component';
import {AnswersComponent} from './answers/answers.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DialogExampleComponent} from './dialog-example/dialog-example.component';
import {DialogAnswerComponent} from './dialog-answer/dialog-answer.component';
import {DialogEditComponent} from './dialog-edit/dialog-edit.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    AnswersComponent,
    PageNotFoundComponent,
    DialogExampleComponent,
    DialogAnswerComponent,
    DialogEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    RouterModule.forRoot([
      {path: 'questions', component: QuestionsComponent},
      {path: 'questions/:id', component: AnswersComponent},
      {path: '', redirectTo: '/questions', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),


  ],
  entryComponents: [DialogExampleComponent, DialogAnswerComponent, DialogEditComponent],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
