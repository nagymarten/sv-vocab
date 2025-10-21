"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Button
      colorScheme="teal"
      onClick={() => router.push("/random")} 
    >
      Go to Random Page
    </Button>
  );
}
