import NavButton from "@/components/shared/nav-button";
import { HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <HStack>
      <NavButton path="/random" label="Random" />
      <NavButton path="/top" label="Top" />
    </HStack>
  );
}
