import { Box } from "@mui/material";
import pokeball from "../assets/pokeball.png";

export default function Spinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <img
        src={pokeball}
        alt="Cargando..."
        style={{
          width: "80px",
          animation: "spin 1s linear infinite"
        }}
      />

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

    </Box>
  );
}
