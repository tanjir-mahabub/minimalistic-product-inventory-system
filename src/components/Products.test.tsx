import { render, screen } from '@testing-library/react';
import { Statistic } from 'antd';

test('renders total products and price component', () => {
    render(
        <>
            <Statistic title="Total Stock" value={10} />
            <Statistic title="Total Price" value={50} />
        </>
    );

    const stockTitle = screen.getByText('Total Stock');
    const totalStock = screen.getByText(10);
    const priceTitle = screen.getByText('Total Price');
    const totalPrice = screen.getByText(10);

    expect(stockTitle).toBeInTheDocument();
    expect(totalStock).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
});