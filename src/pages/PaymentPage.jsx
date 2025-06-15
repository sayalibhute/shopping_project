import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="paymentMethod" className="my-2">
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <Form.Check
              type="radio"
              label="Credit Card"
              id="CreditCard"
              name="paymentMethod"
              value="CreditCard"
              checked={paymentMethod === "CreditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentPage;
