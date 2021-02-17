import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CheckOutSteps from '../components/CheckOutSteps';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions'
import shipping from '../assets/images/shipping.png'

const ShippingScreen = ({ history }) => {

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2/>
    <Container fluid>
      <Row className="justify-content-lg-center align-content-lg-center">
      <Col lg={10}>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" required placeholder="Enter Address" value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" required placeholder="Enter City" value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" required placeholder="Enter postal code" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" required placeholder="Enter Country" value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>
      </Form>
          </Col>
          <Col lg={2}>
            <Image src={shipping} alt="sssss" width={500}/>
        </Col>
        </Row>
      </Container>
    </FormContainer>
  )
}

export default ShippingScreen
