import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders React Toy Project Boilerplate', () => {
  render(<App />);
  const linkElement = screen.getByText(/React Toy Project Boilerplate/i);
  expect(linkElement).toBeInTheDocument();
});
