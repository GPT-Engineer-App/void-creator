import { Container, Box } from "@chakra-ui/react";
import MultiStepForm from '../components/MultiStepForm';

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.50">
      <Box p={6} boxShadow="lg" borderRadius="md" bg="white">
        <MultiStepForm />
      </Box>
    </Container>
  );
};

export default Index;