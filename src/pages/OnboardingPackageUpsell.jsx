import React, { useState } from 'react';
import { Box, Button, Text, VStack, Heading, Container, Flex, FormControl, FormLabel, Image, Badge } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const stripePromise = loadStripe('your-publishable-key-here');

const slides = [
  {
    title: "Welcome to Our Premium Onboarding Workshop",
    content: "Join our $500 onboarding workshop and unlock the full potential of our services. Get personalized support, exclusive features, and dedicated assistance to ensure your success.",
    image: "path/to/welcome-image.jpg"
  },
  {
    title: "Initial Consultations",
    content: "Our initial consultation helps us understand your needs and tailor our services to solve your specific challenges.",
    calendar: true,
    testimonial: "This consultation was a game-changer for our business! - Satisfied Client"
  },
  {
    title: "Strategy Sessions",
    content: "Our strategy sessions provide you with:",
    bulletPoints: [
      "Customized action plans",
      "Expert insights",
      "Clear, achievable goals"
    ],
    infographic: "path/to/strategy-infographic.jpg"
  },
  {
    title: "Setup Tasks",
    content: "We handle all the setup tasks efficiently, ensuring a smooth start. Expect completion within a week, setting you up for success.",
    timeline: "Completion within 7 days"
  },
  {
    title: "Review Summary",
    content: "Our onboarding package offers exceptional value for just $500. Limited slots available, so act fast!",
    urgency: "Limited slots available!"
  }
];

const Slide = ({ slide, onNext, onPrev, isLast }) => (
  <Box p={6} boxShadow="lg" borderRadius="md" bg="white" textAlign="center">
    <Heading as="h3" size="lg" mb={4}>{slide.title}</Heading>
    <Text mb={4}>{slide.content}</Text>
    {slide.image && <Image src={slide.image} alt={slide.title} mb={4} />}
    {slide.calendar && <Calendar />}
    {slide.testimonial && <Text fontStyle="italic" mb={4}>"{slide.testimonial}"</Text>}
    {slide.bulletPoints && (
      <VStack spacing={2} mb={4}>
        {slide.bulletPoints.map((point, index) => (
          <Text key={index}>• {point}</Text>
        ))}
      </VStack>
    )}
    {slide.infographic && <Image src={slide.infographic} alt="Strategy Infographic" mb={4} />}
    {slide.timeline && <Text mb={4}>{slide.timeline}</Text>}
    {slide.urgency && <Text color="red.500" mb={4}>{slide.urgency}</Text>}
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
          <Button type="submit" colorScheme="purple" disabled={!stripe}>Pay $500</Button>
        </Flex>
        <Box mt={4} textAlign="center">
          <Badge colorScheme="green">Secure Payment</Badge>
          <Badge colorScheme="blue">Trusted by Thousands</Badge>
        </Box>
      </form>
    </Box>
  );
};

const ConfirmationScreen = () => (
  <Box p={6} boxShadow="lg" borderRadius="md" bg="white" textAlign="center">
    <Heading as="h3" size="lg" mb={4}>Thank You for Your Purchase!</Heading>
    <Text mb={4}>We appreciate your trust in us. Here are the next steps:</Text>
    <Text mb={4}>1. Check your email for a confirmation and further instructions.</Text>
    <Text mb={4}>2. Our team will reach out to you within 24 hours.</Text>
    <Text mb={4}>Need help? <a href="mailto:support@example.com">Contact Support</a></Text>
    <Button colorScheme="blue" onClick={() => window.location.href = 'https://twitter.com/share?text=I just purchased an amazing onboarding package!&url=https://example.com'}>Share on Twitter</Button>
  </Box>
);

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
      ) : step === slides.length ? (
        <Elements stripe={stripePromise}>
          <PaymentForm onPrev={prevStep} />
        </Elements>
      ) : (
        <ConfirmationScreen />
      )}
    </Container>
  );
};

export default OnboardingPackageUpsell;