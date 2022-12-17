import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterActivePipe } from './filter-active.pipe';
import { FilterArchivePipe } from './filter-archive.pipe';

@NgModule({
  declarations: [FilterActivePipe, FilterArchivePipe],
  exports: [FilterActivePipe, FilterArchivePipe],
  imports: [CommonModule],
})
export class PipesModule {}
