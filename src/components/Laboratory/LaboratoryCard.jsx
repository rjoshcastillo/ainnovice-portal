import { Box, Typography, Card } from "@mui/material";
const LaboratoryCard = ({ icon, name, onClick }) => (
  <Card
    variant="outlined"
    onClick={onClick}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 120,
      cursor: "pointer",
      borderRadius: "10px",
    }}
  >
    <Box width="100%" height="100%" sx={{ textAlign: "center" }}>
      {icon && (
        <Box width="100%" height="80%" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={`../../assets/${icon}`} alt={name} style={{ width: 60, height: 60 }} />
        </Box>
      )}
      <Box width="100%" height="20%">
        <Typography variant="body1">{name}</Typography>
      </Box>
    </Box>
  </Card>
);

export default LaboratoryCard;
