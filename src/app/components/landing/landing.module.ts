import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { SharedModule } from "../shared/shared/shared.module";
import { LandingComponent } from "./landing.component";



///Popravi shared  povezi ga sa landing i home caraousel je problem///

@NgModule({
    declarations: [
        LandingComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        DropdownModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader, 
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),

    ],
    exports: [
        LandingComponent
    ]
})

export class LandingModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
