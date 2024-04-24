// Complete the Index page component here
// Use chakra-ui
import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { FaBirthdayCake } from "react-icons/fa";

const Index = () => {
  const [birthdate, setBirthdate] = useState("");
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(null);
  const [selectedQuoteAuthor, setSelectedQuoteAuthor] = useState("");
  const toast = useToast();

  const famousQuotes = {
    quote: "The only limit to our realization of tomorrow will be our doubts of today.",
    correctAuthor: "Franklin D. Roosevelt",
    authors: ["Albert Einstein", "Franklin D. Roosevelt", "Winston Churchill"],
  };

  const calculateDaysUntilBirthday = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const nextBirthday = new Date(birthDate);

    nextBirthday.setFullYear(today.getFullYear());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = Math.abs(nextBirthday - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilBirthday(diffDays);
  };

  const handleDateChange = (event) => {
    setBirthdate(event.target.value);
    calculateDaysUntilBirthday(event.target.value);
  };

  const handleAuthorGuess = (value) => {
    setSelectedQuoteAuthor(value);
    if (value === famousQuotes.correctAuthor) {
      toast({
        title: "Correct!",
        description: "You guessed the right author!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `Sorry, the correct author is ${famousQuotes.correctAuthor}.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={8} mt="5">
        <Text fontSize="2xl" fontWeight="bold">
          Fyller jag år snart?
        </Text>
        <FormControl>
          <FormLabel htmlFor="birthdate">Enter your birthdate:</FormLabel>
          <Input id="birthdate" type="date" value={birthdate} onChange={handleDateChange} />
        </FormControl>
        {daysUntilBirthday !== null && (
          <Box textAlign="center">
            <Text fontSize="xl">
              <FaBirthdayCake /> {daysUntilBirthday} days until your next birthday!
            </Text>
          </Box>
        )}
        <Box>
          <Text fontSize="lg" mt="8" mb="2">
            Quote of the day:
          </Text>
          <Text fontStyle="italic">"{famousQuotes.quote}"</Text>
          <RadioGroup onChange={handleAuthorGuess} value={selectedQuoteAuthor}>
            <Stack direction="column" mt="4">
              {famousQuotes.authors.map((author) => (
                <Radio key={author} value={author}>
                  {author}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
