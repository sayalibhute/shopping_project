import React, { useEffect } from "react";
 import { useDispatch, useSelector } from 'react-redux';

 import { Row, Col } from 'react-bootstrap'
 import ProductCard from "../components/ProductCard";
import { fetchProducts } from '../redux/slices/ProductsSlice'


const Homepage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <> 
    <h1>Lastest Products</h1>
    {loading ? (
        <h2>Loading</h2>
      ):error ? ( 
      <h3 style={{color:"red"}}>{error}</h3>

      ):(
        <Row>
          {products.map((product)=>(
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product}/>
          </Col>
        ))}</Row>
      )
    }   

    </>////falgment
  )
}

export default Homepage;