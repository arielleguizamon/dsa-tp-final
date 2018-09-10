import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";

class AnonymousLayout extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md={this.props.md}>{this.props.children}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

AnonymousLayout.propTypes = {
  md: PropTypes.number
};

AnonymousLayout.defaultProps = {
  md: 6
};

export default AnonymousLayout;
