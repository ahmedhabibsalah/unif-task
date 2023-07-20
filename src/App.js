import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Todo from "./components/Todo";
import Weather from "./components/Weather";
function App() {
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  const handleChange = (event) => {
    settheme(event.target.checked);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Box sx={{ width: "100%", gap: "1rem" }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <label>Dark Mode</label>
          <Switch checked={theme} color="success" onChange={handleChange} />
          <Todo />
          <Weather />
        </ThemeProvider>
      </Box>
    </Container>
  );
}

export default App;
