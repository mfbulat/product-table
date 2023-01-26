import React from 'react';
import PRODUCTS from './mocks/products-mock.json';
import HEADS from './mocks/heads-mock.json';
import ProductsTable from "./ProductsTable";
import {HeadType} from "./types";

function App() {
  return (
     <ProductsTable heads={HEADS as HeadType[]} products={PRODUCTS}/>
  );
}

export default App;
