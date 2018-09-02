import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt

import { appMetadataReducer } from './redux/app-metadata/state';
import { appAuthReducer } from './redux/app-auth/state';
import { AppAuthSignInRequestEffect, AppAuthCreateUserRequestEffect } from './redux/app-auth/effects';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { MaterialLoaderModule } from './modules/material-loader/material-loader.module';

import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';

import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

import { LoadingComponent } from './components/dialogs/loading/loading.component';
import { ErrorComponent } from './components/dialogs/error/error.component';
import { SignInFormComponent } from './components/forms/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/forms/sign-up-form/sign-up-form.component';
import { PrincipeFormComponent } from './components/forms/principe-form/principe-form.component';
import { MakeupFormComponent } from './components/forms/makeup-form/makeup-form.component';
import { ArticleFormComponent } from './components/forms/article-form/article-form.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { FileFormFieldComponent } from './components/forms/file-form-field/file-form-field.component';
import { BlogFormComponent } from './components/forms/article-form/blog-form/blog-form.component';
import { VideoFormComponent } from './components/forms/article-form/video-form/video-form.component';
import { ArticleProductFormComponent } from './components/forms/article-form/product-form/product-form.component';
import { principeCollectionReducer } from './redux/principe/state';
import { PrincipeService } from './services/principe/principe.service';
import { PrincipeCollectionRequestEffect } from './redux/principe/effects';
import { PrincipesListComponent } from './components/lists/principes-list/principes-list.component';

/*
import { Observable, of, merge } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
*/

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomePageComponent,
    LoadingComponent,
    ErrorComponent,
    SignInFormComponent,
    SignUpFormComponent,
    PrincipeFormComponent,
    MakeupFormComponent,
    ArticleFormComponent,
    ProductFormComponent,
    FileFormFieldComponent,
    BlogFormComponent,
    VideoFormComponent,
    ArticleProductFormComponent,
    PrincipesListComponent,
  ],
  entryComponents: [
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialLoaderModule,
    StoreModule.forRoot({
      router: routerReducer,
      metadata: appMetadataReducer,
      auth: appAuthReducer,
      principe: principeCollectionReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      AppAuthSignInRequestEffect,
      AppAuthCreateUserRequestEffect,
      PrincipeCollectionRequestEffect
    ]),
  ],
  providers: [
    AuthService,
    PrincipeService,
    AppAuthSignInRequestEffect,
    AppAuthCreateUserRequestEffect,
    PrincipeCollectionRequestEffect
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
