import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterActivePipe } from './filter-active.pipe';
import { FilterArchivePipe } from './filter-archive.pipe';
import { ZoneTimePipe } from './zone-time.pipe';

@NgModule({
  declarations: [FilterActivePipe, FilterArchivePipe, ZoneTimePipe],
  exports: [FilterActivePipe, FilterArchivePipe, ZoneTimePipe],
  imports: [CommonModule],
})
export class PipesModule {}
