import { render, screen } from '@testing-library/react';
import { Typography } from 'antd';

test('renders project title', () => {
  render(<Typography.Title>Product Inventory App</Typography.Title>);
  const titleElement = screen.getByText(/Product Inventory App/i);
  expect(titleElement).toBeInTheDocument();
});