import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useUser } from "../../../context/UserContext";
  import Assistant from "../../../services/assistant.services";
  
  const SpecialistDetails = ({ data, callBack }) => {
    const [specialistDetails, setSpecialistDetails] = useState({});
    const { doctorsList } = useUser();
    const [suggestedSpecialist, setSuggestedSpecialist] = useState(null);
    const [filteredSpecialist, setFilteredSpecialist] = useState(null);
  
    const onChange = (e) => {
      const { name, value } = e.target;
      setSpecialistDetails({ ...specialistDetails, [name]: value });
      callBack({ ...specialistDetails, [name]: value });
    };
  
    const getFilteredSpecialist = () => {
      if (suggestedSpecialist) {
        const filtered = doctorsList.filtered((doctor) => doctor.specialty === suggestedSpecialist.name);
        setFilteredSpecialist(filtered);
      }
    };
  
    const generateSpecialist = async () => {
      try {
        const payload = {
          medical_concern: data?.medical_concern,
        };
        const res = await Assistant.getGeneralMedicalNeed(payload);
        const sp = res.data?.medical_field_needed;
  
        if (typeof sp === "string") {
          setSuggestedSpecialist({ name: sp });
        } else if (typeof sp === "object") {
          setSuggestedSpecialist(sp);
        }
      } catch (error) {
        console.error("Error fetching suggested specialist:", error);
      }
    };
  
    useEffect(() => {
      generateSpecialist();
    }, []);
  
    useEffect(() => {
      if (data) {
        setSpecialistDetails({
          doctor: data?.doctor || null,
        });
      }
      getFilteredSpecialist(); // Call this whenever data changes
    }, [data, suggestedSpecialist]);
  
    return (
      <Box>
        <Typography>
          Based on your medical concern, our AI suggests consulting with a&nbsp;
          <strong>
            {suggestedSpecialist ? suggestedSpecialist.name : "..."}
          </strong>
          &nbsp;specialist to address your needs.
          <br />
          {suggestedSpecialist && suggestedSpecialist.description && (
            <Typography
              component="span"
              sx={{ fontStyle: "italic", fontSize: 14 }}
            >
              {suggestedSpecialist.description}
            </Typography>
          )}
        </Typography>
        <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            label="Doctor"
            name="doctorSpecialization"
            value={specialistDetails.doctor || ""}
            onChange={onChange}
            sx={{ flex: 1 }}
          >
            {filteredSpecialist && (
              <MenuItem key={filteredSpecialist.doctor_id || filteredSpecialist.name} value={filteredSpecialist.name}>
                {filteredSpecialist.name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    );
  };
  
  export default SpecialistDetails;
  