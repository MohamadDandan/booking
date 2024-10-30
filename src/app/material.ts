import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
   
    exports: [
        
        MatButtonModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSortModule
        
        ]
    
})

export class angu_MaterialModule {

}