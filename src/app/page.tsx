"use client";

import { useEffect, useState, useCallback } from "react";
import { Stack, Text, Box, Heading, Button, Icon, For } from "@chakra-ui/react";
import { RiRefreshLine } from "react-icons/ri";
import translate from "translate";

const url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "bb9c68b0e7mshd301042598c0375p15b62ejsna7c19b202206",
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  },
};

type WordResult = {
  definition: string;
  partOfSpeech?: string;
  synonyms?: string[];
  antonyms?: string[];
};

type WordResponse = {
  word: string;
  results?: WordResult[];
};

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [definitions, setDefinitions] = useState<WordResult[]>([]);
  const [swedish, setSwedish] = useState<string>("");
  const [hungarian, setHungarian] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const fetchWord = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result: WordResponse = await response.json();

      setWord(result.word);
      setDefinitions(result.results ?? []);

      const translatedSwedish = await translate(result.word, "sv");
      const translatedHungarian = await translate(result.word, "hu");
      setSwedish(translatedSwedish);
      setHungarian(translatedHungarian);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Random Word Generator
      </Heading>
      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          English: {word}
        </Text>
        {definitions.length === 0 ? (
          <p>No definitions found.</p>
        ) : (
          <For each={definitions}>
            {(item, index) => <div key={index}>{item.definition}...</div>}
          </For>
        )}
      </Stack>
      <Text fontSize="xl" color="teal.500">
        Swedish: {swedish}
      </Text>
      <Text fontSize="xl" color="purple.500">
        Hungarian: {hungarian}
      </Text>
      {loading && <Text>Loading...</Text>}
      <Button colorPalette="teal" variant="solid" onClick={fetchWord}>
        <RiRefreshLine />
      </Button>
    </Box>
  );
}
