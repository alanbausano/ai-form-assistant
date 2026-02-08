import { Stack, Typography } from "@mui/material";
import { FormField } from "./FormField";
import { useState } from "react";
import { type Tone, ToneSelector } from "./ToneSelector";

type FormValues = {
  fullName: string;
  role: string;
  bio: string;
  motivation: string;
  experience: string;
  tone: Tone | string;
};

export function FormPage() {
  const [tone, setTone] = useState<Tone>("professional");

  const [values, setValues] = useState<FormValues>({
    fullName: "",
    role: "",
    bio: "",
    motivation: "",
    experience: "",
    tone: "",
  });

  const handleChange = (field: keyof FormValues) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Stack spacing={3}>
      <Typography variant="subtitle1">Writing tone</Typography>

      <ToneSelector value={tone} onChange={setTone} />
      <FormField
        label="Full name"
        placeholder="John Doe"
        value={values.fullName}
        onChange={handleChange("fullName")}
        tone={tone}
      />

      <FormField
        label="Role / Position"
        placeholder="Frontend Developer"
        value={values.role}
        onChange={handleChange("role")}
        tone={tone}
      />

      <FormField
        label="Short bio"
        placeholder="A short professional bio..."
        multiline
        value={values.bio}
        onChange={handleChange("bio")}
        tone={tone}
      />

      <FormField
        label="Motivation"
        placeholder="Why are you applying?"
        multiline
        value={values.motivation}
        onChange={handleChange("motivation")}
        tone={tone}
      />

      <FormField
        label="Experience summary"
        placeholder="Brief summary of your experience..."
        multiline
        value={values.experience}
        onChange={handleChange("experience")}
        tone={tone}
      />
    </Stack>
  );
}
