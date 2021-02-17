import { Card, Col, Row } from "react-bootstrap";

import Grid from "@material-ui/core/Grid";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function SkeletonComponent() {
  return (
    <Row>
      <Col sm={12} md={6} lg={4} xl={3}>
        <Card className="my-3 p-3 rounded">
          <Skeleton variant="rect" width={210} height={118} />
          <Card.Body>
            <Card.Title as="div">
              <Skeleton width="60%" />
            </Card.Title>
            <Card.Text as="div">
              <Skeleton width="60%" />
            </Card.Text>
            <Card.Text as="div">
              <Skeleton />
            </Card.Text>
            <Skeleton />
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={4} xl={3}>
        <Card className="my-3 p-3 rounded">
          <Skeleton variant="rect" width={210} height={118} />
          <Card.Body>
            <Card.Title as="div">
              <Skeleton width="60%" />
            </Card.Title>
            <Card.Text as="div">
              <Skeleton width="60%" />
            </Card.Text>
            <Card.Text as="div">
              <Skeleton />
            </Card.Text>
            <Skeleton />
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={4} xl={3}>
        <Card className="my-3 p-3 rounded">
          <Skeleton variant="rect" width={210} height={118} />
          <Card.Body>
            <Card.Title as="div">
              <Skeleton width="60%" />
            </Card.Title>
            <Card.Text as="div">
              <Skeleton width="60%" />
            </Card.Text>
            <Card.Text as="div">
              <Skeleton />
            </Card.Text>
            <Skeleton />
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={4} xl={3}>
        <Card className="my-3 p-3 rounded">
          <Skeleton variant="rect" width={210} height={118} />
          <Card.Body>
            <Card.Title as="div">
              <Skeleton width="60%" />
            </Card.Title>
            <Card.Text as="div">
              <Skeleton width="60%" />
            </Card.Text>
            <Card.Text as="div">
              <Skeleton />
            </Card.Text>
            <Skeleton />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default SkeletonComponent;
