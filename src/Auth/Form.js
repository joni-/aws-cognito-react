import React from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form as BootstrapForm,
  FormControl,
  FormGroup
} from 'react-bootstrap';


const LabeledInput = ({ type, label, onChange, placeholder }) => (
  <FormGroup>
    <Col xs={2}>
      <ControlLabel>
        {label}:
      </ControlLabel>
    </Col>
    <Col xs={10}>
      <FormControl type={type} onChange={onChange} placeholder={placeholder ? placeholder : ''} />
    </Col>
  </FormGroup>
);

const Form = ({ elements, onSubmit, submitEnabled }) => {
  const myElements = elements.map(({ type, label, onChange, placeholder }) => (
    <LabeledInput key={label} type={type} label={label} onChange={onChange} placeholder={placeholder}/>
  ));

  return (
    <BootstrapForm horizontal>
      {myElements}
      <Col>
        <Button disabled={!submitEnabled} onClick={onSubmit}>Submit</Button>
      </Col>
    </BootstrapForm>
  );
};

export default Form;
