import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ProductForm from './ProductForm';

const AddProduct: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button type="primary" size='large' onClick={() => setOpen(true)}>
                Add Product
            </Button>
            <div>
                <Modal
                    title="Add a new product"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={handleCancel}
                    width={800}
                    footer={null}
                >
                    <ProductForm onCancel={handleCancel} />
                </Modal>
            </div>
        </>
    );
};

export default AddProduct;