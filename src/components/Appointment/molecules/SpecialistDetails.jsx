import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import Assistant from "../../../services/assistant.services";

const SpecialistDetails = ({ data, callBack, canProceed }) => {
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const { doctorsList } = useUser();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [cardLoader, setCardLoader] = useState(false);
  const [specialization, setSpecialization] = useState(null);

  const handleCardClick = (selected) => {
    setSelectedDoctor({
      doctorId: selected.doctor_id,
      specialtyDoctor: selected.specialty,
    });
    callBack({
      doctorId: selected.doctor_id,
      specialtyDoctor: selected.specialty,
    });
    checkIfCanProceed({
      doctorId: selected.doctor_id,
      specialtyDoctor: selected.specialty,
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

  const getSuggestedDoctor = async (medical_concern) => {
    const payload = {
      medical_concern: medical_concern,
    };
    return await Assistant.getGeneralMedicalNeed(payload);
  };
  useEffect(() => {
    const resetDoctorSelection = () => {
      const initialDoctorSelection = { doctorId: null, specialtyDoctor: "" };
      setSelectedDoctor(initialDoctorSelection);
      callBack(initialDoctorSelection);
      checkIfCanProceed(initialDoctorSelection);
    };

    const fetchAndFilterDoctors = async () => {
      setCardLoader(true);

      const doctorSpecialization = data?.knowADoctor
        ? data.specialtyDoctor
        : (await getSuggestedDoctor(data?.medicalConcern)).data
            ?.medical_field_needed?.name;
      setSpecialization(doctorSpecialization);

      if (doctorSpecialization) {
        const filteredDoctors =
          filterDoctorBySpecialization(doctorSpecialization);
        setFilteredDoctors(filteredDoctors);
      }

      setCardLoader(false);
    };

    fetchAndFilterDoctors();
    resetDoctorSelection();
  }, []);

  return (
    <Box>
      {data?.knowADoctor ? (
        <Typography>Base on the doctor's specialty you selected</Typography>
      ) : (
        <Typography>
          Based on your medical concern, our AI suggests consulting with a{" "}
          {cardLoader ? "..." : <strong>{specialization}</strong>}
        </Typography>
      )}
      <Grid
        my={4}
        container
        sx={{ gap: 2, maxHeight: 450, overflow: "scroll", padding: "2px" }}
      >
        {cardLoader ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <CircularProgress />
          </Box>
        ) : filteredDoctors.length < 1 ? (
          <Typography
            variant="body2"
            sx={{ color: "gray", textAlign: "center", width: "100%" }}
          >
            No records found
          </Typography>
        ) : (
          filteredDoctors.map((doctor, index) => (
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
                  selectedDoctor?.doctorId === doctor.doctor_id
                    ? "primary.main"
                    : "background.paper",
                color:
                  selectedDoctor?.doctorId === doctor.doctor_id
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
                      selectedDoctor?.doctorId === doctor.doctor_id
                        ? "white"
                        : "primary.main",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Typography variant="body2">View</Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default SpecialistDetails;
