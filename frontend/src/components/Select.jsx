import React from "react";
import { Input, Form, FormFeedback, FormGroup, Label, Col } from "reactstrap";

const RSSelect = props => {
  const {
    errors,
    options,
    label,
    valueAccessor,
    labelAccessor,
    ...rest
  } = props;
  return (
    <Form className="form-horizontal">
      <FormGroup row>
        {label && (
          <Col xs="3">
            <Label>{label}</Label>
          </Col>
        )}
        <Col xs="9">
          <Input
            {...rest}
            type="select"
            invalid={!!errors}
            className={"form-control-sm"}
          >
            {!rest.value && <option value="" />}
            {options.map((element, index) => {
              return (
                <option key={index} value={element[valueAccessor]}>
                  {element[labelAccessor]}
                </option>
              );
            })}
          </Input>
          <FormFeedback>{errors}</FormFeedback>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default RSSelect;
