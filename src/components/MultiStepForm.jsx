import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack, Heading, Text, Flex } from '@chakra-ui/react';

const MultiStepForm = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    // Add the current input value to the messages array
    setMessages([...messages, inputValue]);

    // Send the input value to the API
    const response = await fetch('https://qiadkr.buildship.run/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt: inputValue }),
    });

    const data = await response.json();
    setApiResponse(data.message); // Assuming the API returns a JSON object with a "message" field

    // Clear the input field
    setInputValue('');
  };

  return (
    <Box p={6} boxShadow="lg" borderRadius="md" bg="white">
      <VStack spacing={4}>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
        <FormControl id="userPrompt">
          <FormLabel>Enter your message</FormLabel>
          <Input type="text" value={inputValue} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="purple" onClick={handleSubmit}>Next</Button>
        {apiResponse && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
            <Text>{apiResponse}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MultiStepForm;