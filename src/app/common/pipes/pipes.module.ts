import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterActivePipe } from '@pipes/filter-active.pipe';
import { FilterArchivePipe } from '@pipes/filter-archive.pipe';
import { ZoneTimePipe } from '@pipes/zone-time.pipe';
import { FormatDatePipe } from '@pipes/format-date.pipe';

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
