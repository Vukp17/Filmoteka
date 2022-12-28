import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { DropdownModule } from "primeng/dropdown";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { SelectButtonModule } from "primeng/selectbutton";
import { SplitButtonModule } from "primeng/splitbutton";
import { HeaderComponent } from "./header.component";
import { MenubarComponent } from "./menubar/menubar.component";



@NgModule({
    declarations: [
        MenubarComponent,
        HeaderComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        CardModule,
        ButtonModule,
        CommonModule,
        MenubarModule,
        MenuModule,
        SelectButtonModule,
        DropdownModule,
        SplitButtonModule,
        ReactiveFormsModule,
        CascadeSelectModule,
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader, 
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),

    ],
    exports: [
        MenubarComponent,
        HeaderComponent,
    ]
})

export class HeaderModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
