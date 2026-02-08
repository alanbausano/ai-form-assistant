import { Container, Typography } from "@mui/material";
import { FormPage } from "./components/FormPage";

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Form Assistant
      </Typography>

      <FormPage />
    </Container>
  );
}

export default App;
