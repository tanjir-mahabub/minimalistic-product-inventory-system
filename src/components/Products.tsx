import { useQuery } from '@apollo/client';
import { COUNT_PRODUCTS } from '../graphql/queries/countQuery';
import { GET_PRODUCT_LIST } from '../graphql/queries/getProductList';
import { TOTAL_PRICE } from '../graphql/queries/totalPrice';
import { Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup';
import ListProducts from './listProduct/ListProducts';
import AddProduct from './addProduct/AddProduct';

export function Products(): JSX.Element {

  const { data: countData } = useQuery(COUNT_PRODUCTS);
  const { data: totalPriceData } = useQuery(TOTAL_PRICE);
  const { data: productData } = useQuery(GET_PRODUCT_LIST);

  const formatter = (value: any) => <CountUp end={value} separator="," />

  return (
    <div>
      <Row justify={'center'} style={{ background: '#001529', borderRadius: '5px' }}>
        <Col span={10}>
          <div style={{ padding: '16px 0' }}>
            <Statistic title="Total products" value={countData?.products_aggregate?.aggregate.count} formatter={formatter} />
          </div>
        </Col>
        <Col span={10}>
          <div style={{ padding: '16px 0' }}>
            <Statistic title="Total price" value={totalPriceData?.products_aggregate?.aggregate.sum.price} formatter={formatter} />
          </div>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col span={24}>
          <div style={{ padding: '16px 0' }}>
            <ListProducts products={productData?.products} />
          </div>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col span={24}>
          <div style={{ padding: '16px 0' }}>
            <AddProduct />
          </div>
        </Col>
      </Row>
    </div>
  );
}