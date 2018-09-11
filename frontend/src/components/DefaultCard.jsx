import React from "react";
import { Col, Card, CardBody } from "reactstrap";

class DefaultCard extends React.Component {
  render() {
    return (
      <Col xs={this.props.xs || 12}>
        <Card>
          <CardBody>{this.props.children}</CardBody>
        </Card>
      </Col>
    );
  }
}

export default DefaultCard;
