import { Container } from "@chakra-ui/react";
import MultiStepForm from '../components/MultiStepForm';

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <MultiStepForm />
    </Container>
  );
};

export default Index;