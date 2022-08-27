import { render } from '@testing-library/react';
import MetaData from '../components/layout/MetaData';
import { Helmet } from 'react-helmet';

// Tests the MetaData component.
test("renders MetaData copy", () => {
    render(<MetaData title="My test" />);
    const helmet = Helmet.peek();
    expect(helmet.title).toBe("My test - All You Need");
});
