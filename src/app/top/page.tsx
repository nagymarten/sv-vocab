"use client";

import {
  Stack,
  Text,
  Box,
  Heading,
  Button,
  For,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Top() {
      const router = useRouter();

  return (
    <Stack>
      <Text>Top Page</Text>
      <Button colorScheme="teal" onClick={() => router.push("/")}>
        Go to Home Page
      </Button>
    </Stack>
  );
}
