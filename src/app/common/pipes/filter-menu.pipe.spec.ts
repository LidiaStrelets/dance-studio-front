import { FilterMenuPipe } from '@pipes/filter-menu.pipe';

fdescribe('FilterMenuPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterMenuPipe();
    expect(pipe).toBeTruthy();
  });
});
