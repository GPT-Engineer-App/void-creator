import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack, Heading } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const Step1 = ({ nextStep, handleChange, values }) => (
  <Box>
    <Heading as="h3" size="lg" mb={4}>Customer Details</Heading>
    <FormControl id="name" mb={4}>
      <FormLabel>Name</FormLabel>
      <Input type="text" value={values.name} onChange={handleChange('name')} />
    </FormControl>
    <FormControl id="email" mb={4}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={values.email} onChange={handleChange('email')} />
    </FormControl>
    <Button onClick={nextStep}>Next</Button>
  </Box>
);

const Step2 = ({ nextStep, prevStep, handleChange, values }) => (
  <Box>
    <Heading as="h3" size="lg" mb={4}>Colleagues' Emails</Heading>
    <FormControl id="colleagues" mb={4}>
      <FormLabel>Colleagues' Emails</FormLabel>
      <Input type="text" value={values.colleagues} onChange={handleChange('colleagues')} />
    </FormControl>
    <Button onClick={prevStep} mr={4}>Back</Button>
    <Button onClick={nextStep}>Next</Button>
  </Box>
);

const Step3 = ({ prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <Box>
      <Heading as="h3" size="lg" mb={4}>Payment</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="card" mb={4}>
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>
        <Button onClick={prevStep} mr={4}>Back</Button>
        <Button type="submit" disabled={!stripe}>Pay</Button>
      </form>
    </Box>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    colleagues: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} handleChange={handleChange} values={formValues} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formValues} />;
    case 3:
      return (
        <Elements stripe={stripePromise}>
          <Step3 prevStep={prevStep} />
        </Elements>
      );
    default:
      return <Step1 nextStep={nextStep} handleChange={handleChange} values={formValues} />;
  }
};

export default MultiStepForm;