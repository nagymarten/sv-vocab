"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type NavButtonProps = {
  path: string;
  label: string;
  colorScheme?: string;
};

export default function NavButton({
  path,
  label,
  colorScheme = "teal",
}: NavButtonProps) {
  const router = useRouter();

  return (
    <Button colorScheme={colorScheme} onClick={() => router.push(path)}>
      {label}
    </Button>
  );
}
