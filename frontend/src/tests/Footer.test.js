import { render, screen } from '@testing-library/react';
import Footer from '../components/layout/Footer';
import '@testing-library/jest-dom/extend-expect';

// Tests the Footer component.
test("renders Footer copy", () => {
    render(<Footer />);
    expect(screen.getByText("Copyright © 2022-2023, All You Need Ltd.")).toBeInTheDocument();
});
