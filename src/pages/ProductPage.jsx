import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Form, Card } from "react-bootstrap";
import axios from 'axios';
import { addToCart } from "../redux/slices/CardSlice";

function ProductPage() {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);

        }
        fetchProduct();
    }, [id]);

    const addTocartHandler = () => {
        dispatch(addToCart({ product, qty }));
        navigate("/cart");
    };
    return (

        <Row>
            <Col md={6}className="p-[200px]">
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item>price:${product.price}</ListGroup.Item>
                    <ListGroup.Item>Description:${product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? "In Stock" : "Out of stock"}</Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 &&(
                            <ListGroup.Item>
                                <Form.Select value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                                    {
                                        [...Array(product.countInStock).keys().map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))]
                                    }
                                </Form.Select>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addTocartHandler}>
                         Add to cart
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default ProductPage;