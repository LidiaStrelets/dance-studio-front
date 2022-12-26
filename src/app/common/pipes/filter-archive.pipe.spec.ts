import { FilterArchivePipe } from '@pipes/filter-archive.pipe';

fdescribe('FilterArchivePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterArchivePipe();
    expect(pipe).toBeTruthy();
  });
});
