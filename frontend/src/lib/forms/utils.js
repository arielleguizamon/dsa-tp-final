const updateForm = function(form, element) {
  return event => {
    event.persist();
    this.setState(state => ({
      [form]: {
        ...state[form],
        [element]: {
          ...state[form][element],
          value: event.target.value
        }
      }
    }));
  };
};

const validateField = function(form, element) {
  return () => {
    const errors = this.state[form][element].validate({
      value: this.state[form][element].value
    }).errors;
    this.setState(state => ({
      [form]: {
        ...state[form],
        [element]: {
          ...state[form][element],
          errors
        }
      }
    }));
    return errors;
  };
};

const validateForm = function(form) {
  return Object.keys(this.state[form]).reduce((valid, element) => {
    const errors = this.validateField(form, element)();
    return valid && !errors;
  }, true);
};

const populateErrors = function(form, errors) {
  //mejorar para devolver los errores que no van en los form para mostrar en los toast
  if (errors.errors) {
    return Object.keys(errors.errors).map(element => {
      if (this.state[form][element]) {
        this.setState(state => ({
          [form]: {
            ...state[form],
            [element]: {
              ...state[form][element],
              errors: errors.errors[element].message
            }
          }
        }));
      } else {
        return errors.errors[element].message;
      }
    });
  }
  return [];
};

export { updateForm, validateField, validateForm, populateErrors };
