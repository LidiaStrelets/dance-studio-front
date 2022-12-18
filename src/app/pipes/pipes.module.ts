import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterActivePipe } from './filter-active.pipe';
import { FilterArchivePipe } from './filter-archive.pipe';
import { ZoneTimePipe } from './zone-time.pipe';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  declarations: [
    FilterActivePipe,
    FilterArchivePipe,
    ZoneTimePipe,
    FormatDatePipe,
  ],
  exports: [FilterActivePipe, FilterArchivePipe, ZoneTimePipe, FormatDatePipe],
  imports: [CommonModule],
})
export class PipesModule {}
