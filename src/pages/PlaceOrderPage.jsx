import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/slices/orderSlice";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 20;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    navigate("/order/:id");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Order Summary</h1>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              {shippingAddress.address},{shippingAddress.city},
              {shippingAddress.postalCode},{shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>{paymentMethod}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {cartItems.map((item) => (
              <Row key={item.id}>
                <Col md={8}>{item.name}</Col>
                <Col md={2}>
                  {item.qty} x ₹{item.price}
                </Col>
                <Col md={2}>₹{(item.qty * item.price).toFixed(2)}</Col>
              </Row>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>₹{itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>₹{shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>₹{taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>₹{totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="primary"
                className="btn-block"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderPage;
