"use client";

import { Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <HStack>
      {" "}
      <Button colorScheme="teal" onClick={() => router.push("/random")}>
        Go to Random Page
      </Button>
      <Button colorScheme="teal" onClick={() => router.push("/top")}>
        Go to top Page
      </Button>
    </HStack>
  );
}
