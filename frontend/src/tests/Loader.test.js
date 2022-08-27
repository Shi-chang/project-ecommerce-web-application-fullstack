import { render, screen } from '@testing-library/react';
import Loader from '../components/layout/Loader';
import '@testing-library/jest-dom/extend-expect';

// Tests the Loader component.
test("renders Loader copy", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});
