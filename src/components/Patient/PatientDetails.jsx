import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from '../../context/SnackbarProvider';

function PatientDetails() {
  const { user } = useUser();

 
  return (
    <Box>
      <Card sx={{ padding: 4 }}>
        <Typography sx={{ fontWeight: 700 }}>Personal Information</Typography>
        <Divider component="div" sx={{ my: 2 }} />
        <Box sx={{ width: "100%", display: "flex", gap: 4 }}>
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <TextField
              disabled
              id="outlined-disabled"
              defaultValue={user?.fullName}
              label="Name"
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="gender" row defaultValue={user?.gender}>
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FormLabel component="legend">Employed</FormLabel>
                <RadioGroup name="employed" row defaultValue={user?.employed}>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            </Box>

            <TextField
              disabled
              id="outlined-disabled"
              label="Job Description"
              defaultValue={user?.jobDescription}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                disabled
                id="outlined-disabled"
                defaultValue={user?.age}
                label="Age"
                fullWidth
              />
              <TextField
                disabled
                id="outlined-disabled"
                defaultValue={user?.contactNumber}
                label="Phone Number"
                fullWidth
              />
              <TextField
                disabled
                id="outlined-disabled"
                defaultValue={user?.email}
                label="Email"
                fullWidth
              />
            </Box>
            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Button variant="outlined" color="primary">
                Update
              </Button>
              <Button variant="contained" color="primary">
                Save info
              </Button>
            </Box>
          </Box>

          {/* Second Column */}
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*  */}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default PatientDetails;
