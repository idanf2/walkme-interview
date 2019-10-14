import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { PanelComponent } from './components/panel/panel.component';
import { ElementsListComponent } from './components/elements-list/elements-list.component';
import { DraggableElementComponent } from './components/draggable-element/draggable-element.component';
import { ShapeStyleComponent } from './components/shape-style/shape-style.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import {SVGService} from './services/svg.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { ColorPickerModule } from 'ngx-color-picker';
import { PositionEditComponent } from './components/position-edit/position-edit.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    WysiwygComponent,
    DropZoneComponent,
    PanelComponent,
    ElementsListComponent,
    DraggableElementComponent,
    ShapeStyleComponent,
    DraggableDirective,
    DroppableDirective,
    PositionEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    ColorPickerModule,
    MatButtonModule
  ],
  providers: [SVGService],
  bootstrap: [AppComponent]
})
export class AppModule { }
