import type { FormEvent } from "react";

export const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const { emil, password } = event.target as HTMLFormElement;
  console.log(emil);
  console.log(password);
};
