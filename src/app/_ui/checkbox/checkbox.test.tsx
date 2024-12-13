import { render, screen } from '@testing-library/react';

import type { ChangeEvent } from 'react';

import { Checkbox } from '.';

test('チェックボックスのテスト', async (): Promise<void> => {
  render(
    <Checkbox
      key="1"
      type="prefecture"
      id="1"
      name="北海道"
      text="北海道"
      onChange={(event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        target.checked = !target.checked;
      }}
      color="#000"
      isChecked={true}
    />
  );
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeChecked();
});
