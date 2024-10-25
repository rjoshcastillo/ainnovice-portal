import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";

const SpecialistDetails = ({ data, callBack, canProceed }) => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const { doctorsList } = useUser();
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleCardClick = (selected) => {
    setSelectedDoctor({
      doctor_id: selected.doctor_id,
    });
    callBack({ doctor_id: selected.doctor_id });
    checkIfCanProceed({
      doctor_id: selected.doctor_id,
    });
  };

  const checkIfCanProceed = (details) => {
    const hasValue = Object.values(details).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    canProceed(hasValue);
  };

  const filterDoctorBySpecialization = (filter) => {
    if (!filter) return doctorsList;
    return doctorsList.filter((doctor) => doctor.specialty === filter);
  };

  useEffect(() => {
    const filtered = filterDoctorBySpecialization(data?.specialtyDoctor);
    setFilteredDoctors(filtered);
    setSelectedDoctor({
      doctor_id: null,
    });
    callBack({
      doctor_id: null,
    });
    checkIfCanProceed({
      doctor_id: null,
    });
  }, []);

  return (
    <Box>
      {data?.knowADoctor ? (
        <Typography>Base on the doctor's specialty you selected</Typography>
      ) : (
        <Typography>
          Based on your medical concern, our AI suggests consulting with...
        </Typography>
      )}
      <Grid
        my={4}
        container
        sx={{ gap: 2, maxHeight: 450, overflow: "scroll", padding: "2px" }}
      >
        {filteredDoctors.map((doctor, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(doctor)}
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              backgroundColor:
                selectedDoctor?.doctor_id === doctor.doctor_id
                  ? "primary.main"
                  : "background.paper",
              color:
                selectedDoctor?.doctor_id === doctor.doctor_id
                  ? "background.paper"
                  : "primary.main",
              width: "45%",
              height: 90,
            }}
          >
            <Box sx={{ ml: 2 }}>
              <Avatar />
            </Box>
            <CardContent sx={{ flex: 1, position: "relative" }}>
              <Typography variant="span" sx={{ fontWeight: 600 }}>
                {doctor.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 12 }}>
                {doctor.specialty}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  right: 16,
                  color:
                    selectedDoctor?.doctor_id === doctor.doctor_id
                      ? "white"
                      : "primary.main",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography variant="body2">
                  View
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialistDetails;
