import React, { useState } from 'react';
import { Box, Button, Text, VStack, Heading, Container, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const slides = [
  {
    title: "Welcome to Our Onboarding Package",
    content: "Our onboarding package offers personalized support to help you get the most out of our services."
  },
  {
    title: "Exclusive Features",
    content: "Gain access to exclusive features and tools that will accelerate your success."
  },
  {
    title: "Dedicated Support",
    content: "Enjoy dedicated support from our team of experts, available to assist you at every step."
  },
  {
    title: "Affordable Pricing",
    content: "All these benefits for just $49.99!"
  }
];

const Slide = ({ slide, onNext, onPrev, isLast }) => (
  <Box p={6} boxShadow="lg" borderRadius="md" bg="white" textAlign="center">
    <Heading as="h3" size="lg" mb={4}>{slide.title}</Heading>
    <Text mb={4}>{slide.content}</Text>
    <Flex justifyContent="space-between">
      <Button onClick={onPrev} disabled={!onPrev}>Back</Button>
      <Button onClick={onNext}>{isLast ? "Proceed to Payment" : "Next"}</Button>
    </Flex>
  </Box>
);

const PaymentForm = ({ onPrev }) => {
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
    <Box p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading as="h3" size="lg" mb={4}>Payment</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="card" mb={4}>
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>
        <Flex justifyContent="space-between">
          <Button onClick={onPrev}>Back</Button>
          <Button type="submit" colorScheme="purple" disabled={!stripe}>Pay $49.99</Button>
        </Flex>
      </form>
    </Box>
  );
};

const OnboardingPackageUpsell = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.50">
      {step < slides.length ? (
        <Slide
          slide={slides[step]}
          onNext={nextStep}
          onPrev={step > 0 ? prevStep : null}
          isLast={step === slides.length - 1}
        />
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentForm onPrev={prevStep} />
        </Elements>
      )}
    </Container>
  );
};

export default OnboardingPackageUpsell;