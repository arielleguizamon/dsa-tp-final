const notRequired = () => {
  return ({ value, errors = "" }) => {
    return { value, errors };
  };
};

const required = () => {
  return ({ value, errors = "" }) => {
    if (!value) {
      return { errors: errors + "Requerido. ", value };
    }
    return { value, errors };
  };
};

const minLength = minLength => {
  return ({ value, errors = "" }) => {
    if (!value || value.length < minLength) {
      return {
        errors: errors + `Debe tener ${minLength} caracteres como mínimo. `,
        value
      };
    }
    return { value, errors };
  };
};

const maxLength = maxLength => {
  return ({ value, errors = "" }) => {
    if (!value || value.length > maxLength) {
      return {
        errors: errors + `Debe tener ${maxLength} caracteres como máximo. `,
        value
      };
    }
    return { value, errors };
  };
};

const length = length => {
  return ({ value, errors = "" }) => {
    if (!value || value.length !== length) {
      return {
        errors: errors + `Debe tener ${length} caracteres. `,
        value
      };
    }
    return { value, errors };
  };
};

const email = () => {
  return ({ value, errors = "" }) => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!value || !regex.test(value)) {
      return { errors: errors + "Email inválido.", value };
    }
    return { value, errors };
  };
};

export { notRequired, required, length, minLength, maxLength, email };
