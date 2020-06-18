import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports: [ 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule
  ]    
})

export class MaterialModule {}