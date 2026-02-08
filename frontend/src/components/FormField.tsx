import {
  TextField,
  Stack,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useAIField } from "../hooks/useAIField";
import type { Tone } from "./ToneSelector";

type FormFieldProps = {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  value: string;
  onChange: (value: string) => void;
  tone: Tone;
};

export function FormField({
  label,
  placeholder,
  multiline = false,
  value,
  onChange,
  tone,
}: FormFieldProps) {
  const { loading, result, improve } = useAIField();

  return (
    <Stack spacing={1}>
      <TextField
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 3 : 1}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Stack direction="row" spacing={1} alignItems="center">
        {/* AI actions will live here */}
        <Button
          variant="outlined"
          size="small"
          disabled={!value.trim()}
          onClick={() => improve(value, label, tone)}
        >
          Improve with AI
        </Button>
        {loading && <CircularProgress size={18} />}
      </Stack>

      <Fade in={!!result} timeout={900}>
        <div>
          {result && (
            <TextField
              label="AI suggestion"
              value={result.suggestion}
              multiline
              minRows={2}
              fullWidth
            />
          )}
        </div>
      </Fade>
    </Stack>
  );
}
