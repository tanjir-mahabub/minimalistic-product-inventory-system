import { Form, Input, Button, InputNumber, Row, Col, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT_MUTATION, AddProductMutationData, AddProductMutationVariables } from '../../graphql/mutations/addProduct';
import { GET_PRODUCT_LIST } from '../../graphql/queries/getProductList';
import { TOTAL_PRICE } from '../../graphql/queries/totalPrice';
import { COUNT_PRODUCTS } from '../../graphql/queries/countQuery';


interface ProductFormProps {
    onCancel: () => void;
}

type formProps = {
    name: string,
    description: string,
    stock: number,
    price: number
}

type NotificationType = 'success' | 'error';

const ProductForm: React.FC<ProductFormProps> = ({ onCancel }) => {
    const [form] = useForm();
    const [addProduct, { loading, error }] = useMutation<AddProductMutationData, AddProductMutationVariables>(ADD_PRODUCT_MUTATION);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: NotificationType) => {
        const description = type === 'success' ? 'Successfully product created' : 'Failed to create product';
        const status = type === 'success' ? 'Success' : 'Failure';

        api[type]({
            message: status,
            description: description,
        });
    };

    const onFinish = async (values: formProps) => {
        try {
            const { data } = await addProduct({
                variables: { input: values },
                refetchQueries: [{ query: GET_PRODUCT_LIST }, { query: TOTAL_PRICE }, { query: COUNT_PRODUCTS }]
            });
            console.log('product added: ', data);

            form.resetFields();

            onCancel();
            openNotification('success');

        } catch (err) {
            openNotification('error')
            // console.error('Error adding product:', err);            
        }
    };

    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                layout='vertical'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '100%', padding: '14px 0px' }}
                onFinish={onFinish}
            >
                <Row align={'middle'} style={{ padding: '0px 0px' }}>
                    <Col>
                        <div>
                            {loading ? <p style={{ color: 'orange' }}>Data processing...</p> :
                                error && (
                                    (error?.message.includes("products_name_key")) ?
                                        (<p style={{ color: 'red' }}>This product is already exists. Please try to add different product name.</p>) :
                                        (<p style={{ color: 'red' }}>Submission failed due to a network issue. Please try again later.</p>)
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <Row align={'middle'} justify={'center'} style={{ padding: '5px 0px' }}>
                    {/* Product Name */}
                    <Col span={20}>
                        <Form.Item
                            labelAlign='left'
                            labelCol={{ span: 6 }}
                            label="Product Name"
                            name="name"
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                            rules={[{ required: true, message: 'Please enter the product name' }]}
                        >
                            <Input placeholder="Product Name" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row align={'middle'} justify={'center'} style={{ padding: '5px 0px' }}>
                    <Col span={20}>
                        {/* Description */}
                        <Form.Item
                            labelAlign='left'
                            labelCol={{ span: 8 }}
                            label="Product Description"
                            name="description"
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                            rules={[{ required: true, message: 'Please enter the product description' }]}
                        >
                            <Input.TextArea placeholder="Write a short product description" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12} justify={'center'} align={'middle'} style={{ padding: '5px 0px' }}>
                    <Col span={10}>
                        {/* Stock */}
                        <Form.Item
                            initialValue={0}
                            labelAlign='left'
                            labelCol={{ span: 6 }}
                            label="Stock"
                            name="stock"
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                            rules={[
                                { type: 'number', required: true, message: 'Please enter the stock quantity' }
                            ]}
                        >
                            <InputNumber min={0} placeholder="Stock" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        {/* Price */}
                        <Form.Item
                            initialValue={0}
                            labelAlign='left'
                            labelCol={{ span: 6 }}
                            label="Price"
                            name="price"
                            style={{ fontSize: '14px', fontWeight: 'bold' }}
                            rules={[{ required: true, message: 'Please enter the product price' }]}
                        >
                            <InputNumber min={0} placeholder="Price" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>



                <Row justify={'center'} align={'middle'} style={{ padding: '5px 0px' }}>
                    <Col>
                        {/* Submit Button */}
                        <Form.Item wrapperCol={{ span: 14 }} style={{ paddingTop: '10px' }}>
                            <Button type="primary" htmlType="submit" size='large'>
                                Add Product
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ProductForm