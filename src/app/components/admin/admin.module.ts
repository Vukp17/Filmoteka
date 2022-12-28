import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgImageSliderModule } from "ng-image-slider";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { AdminAnalyticsComponent } from "./admin-analytics/admin-analytics.component";
import { AdminDbListItemComponent } from "./admin-db-list/admin-db-list-item/admin-db-list-item.component";
import { AdminDbListComponent } from "./admin-db-list/admin-db-list.component";
import { AdminListItemComponent } from "./admin-list/admin-list-item/admin-list-item.component";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { AdminComponent } from "./admin.component";


@NgModule({
    declarations: [
        AdminDbListComponent,
        AdminDbListItemComponent,
        AdminAnalyticsComponent,
        AdminComponent,
        AdminListComponent,
        AdminListItemComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CardModule,
        ButtonModule,
        DialogModule,
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        BrowserModule,
        NgImageSliderModule,
        FormsModule,
        
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader, 
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
    ],
    exports: [
        AdminDbListComponent,
        AdminDbListItemComponent,
        AdminAnalyticsComponent,
        AdminComponent,
        AdminListComponent,
        AdminListItemComponent,



    ]
})

export class AdminModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
