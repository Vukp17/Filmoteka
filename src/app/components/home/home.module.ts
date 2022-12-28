import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { SharedModule } from "../shared/shared/shared.module";
import { HomeComponent } from "./home.component";





@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports:[
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        CommonModule,
        DropdownModule,
        ReactiveFormsModule,
        DialogModule,
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader, 
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),

    ],
    exports: [
        HomeComponent
    ]
})

export class HomeModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
