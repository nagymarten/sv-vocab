import { signIn } from "@/auth";
import { Button } from "@chakra-ui/react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
