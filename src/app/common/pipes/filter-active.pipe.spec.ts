import { FilterActivePipe } from '@pipes/filter-active.pipe';

fdescribe('FilterActivePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterActivePipe();
    expect(pipe).toBeTruthy();
  });
});
