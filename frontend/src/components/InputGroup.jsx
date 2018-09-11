import React from "react";
import { colors } from "../theming";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from "reactstrap";

const RSInputGroup = props => {
  const { errors, icon, ...rest } = props;
  const style = errors
    ? { borderColor: colors.danger, color: colors.danger }
    : {};

  return (
    <InputGroup className="mb-3">
      {props.icon && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText style={style}>
            <i className={icon} style={style} />
          </InputGroupText>
        </InputGroupAddon>
      )}
      <Input {...rest} invalid={!!errors} />
      <FormFeedback>{errors}</FormFeedback>
    </InputGroup>
  );
};

export default RSInputGroup;
