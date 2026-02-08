import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export type Tone = "professional" | "casual" | "technical";

type ToneSelectorProps = {
  value: Tone;
  onChange: (tone: Tone) => void;
};

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newTone) => {
        if (newTone) onChange(newTone);
      }}
      size="small"
    >
      <ToggleButton value="professional">Professional</ToggleButton>
      <ToggleButton value="casual">Casual</ToggleButton>
      <ToggleButton value="technical">Technical</ToggleButton>
    </ToggleButtonGroup>
  );
}
