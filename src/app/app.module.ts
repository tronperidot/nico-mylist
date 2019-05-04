import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MylistItemComponent } from './mylist-item/mylist-item.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { SimpleModalModule } from 'ngx-simple-modal';
import { TagEditDialogComponent } from './tag-edit-dialog/tag-edit-dialog.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    MylistItemComponent,
    SearchBoxComponent,
    TagEditDialogComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SimpleModalModule.forRoot({container: document.body}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TagEditDialogComponent,
  ]
})
export class AppModule { }
