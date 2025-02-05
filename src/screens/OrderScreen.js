import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import React, {useEffect, useState} from 'react'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios';

const OrderScreen = ({match, history}) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const disptach = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  if (!loading) {
    
    //Calculate prices
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    }
    order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  }

  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);

    }

    if (!order || successPay || successDeliver) {
      disptach({ type: ORDER_PAY_RESET });
      disptach({ type: ORDER_DELIVER_RESET });
      disptach(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      }
      else {
        setSdkReady(true);
      }
    }
  }, [disptach, orderId, successPay, order, successDeliver]);
  
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    disptach(payOrder(orderId, paymentResult));
  }

  const deliverHandler = () => {
    disptach(deliverOrder(order));
  };

  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Paid on {order.deliveredAt}</Message> : 
                <Message variant="danger">Not Delivered!</Message>
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : 
                <Message variant="danger">Not Paid!</Message>
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message>Order is empty!</Message> : (
                <ListGroup variant="flush">
                  { order.orderItems.map((item,index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col>
                            {item.qty} x ${item.price} = ${item.qty*item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  { loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : (
                    <PayPalButton 
                      amount={order.totalPrice}
                      onSuccess = {successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader/>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
}

export default OrderScreen
