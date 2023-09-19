import React, { useState } from 'react';
import './App.css';
import { Layout, Typography } from 'antd';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { Products } from './components/Products';

const { Header, Content } = Layout;
const { Title } = Typography;

const graphqlURI = process.env.REACT_APP_GRAPHQL_URI;
const authToken = process.env.REACT_APP_SECRET_KEY;

const createApolloClient = (authToken: string | undefined) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: graphqlURI,
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": `${authToken}`
      }
    }),
    cache: new InMemoryCache(),
  });
};

const App: React.FC = () => {

  const [client] = useState(createApolloClient(authToken));

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout style={{ height: '100vh' }}>
          <Header className='header' style={{ padding: '40px 0' }}>
            <Title className='header-title'>Product Inventory App</Title>
          </Header>
          <Content style={{ padding: '1em' }}>
            <Products />
          </Content>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
