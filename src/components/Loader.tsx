import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => (
  <Box width="100%" display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
);

export default Loader;
