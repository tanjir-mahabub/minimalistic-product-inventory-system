import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

interface DataType {
    key: string;
    name: string;
    description?: string,
    stock: number;
    price: number;
}

interface ListProductsProps {
    products: DataType[] | undefined;
}

const columns: ColumnsType<DataType> = [
    {
        key: '1',
        title: 'Name',
        dataIndex: 'name',
    },
    {
        key: '2',
        title: 'Description',
        dataIndex: 'description'
    },
    {
        key: '3',
        title: 'Stock',
        dataIndex: 'stock',
    },
    {
        key: '4',
        title: 'Price',
        dataIndex: 'price',
    },
];

const ListProducts: React.FC<ListProductsProps> = ({ products }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        products && setLoading(false);
    }, [products])

    return (
        <>
            <Table
                loading={loading}
                columns={columns}
                dataSource={products}
                pagination={false}
                bordered
                rowKey="id"
                scroll={{ x: 380, y: 350 }}
            />
        </>
    )
};


export default ListProducts;