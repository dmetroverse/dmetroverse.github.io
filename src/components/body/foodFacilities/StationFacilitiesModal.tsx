import React, { useState } from "react";
import { Facility } from "../../../common/types";
import { useTheme } from "../../../context/ThemeContext"; // Update with the correct path
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

interface StationFacilitiesModalProps {
  open: boolean;
  handleClose: () => void;
  stationName: string;
  facilities: Facility[];
}

const StationFacilitiesModal: React.FC<StationFacilitiesModalProps> = ({
  open,
  handleClose,
  stationName,
  facilities,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFacilities = facilities.flatMap(
    (facility: Facility, facilityIndex) =>
      facility.detail_list.filter((detail) =>
        detail.facility_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxHeight: "80%",
          overflow: "auto",
          padding: "1rem",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <Typography variant="h6">{stationName}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Search Facilities"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box
          style={{
            overflow: "scroll",
            maxHeight: "calc(100% - 5rem)",
            padding: "1rem",
          }}
        >
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map((detail, index) => (
              <Box key={index} marginBottom={2}>
                <Typography fontWeight="bold">
                  {detail.facility_name}
                </Typography>
                <Typography>
                  Purpose: {detail.purpose || "Not Found"}
                </Typography>
                <Typography>
                  Location: {detail.location_description || "Not Found"}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No facilities found</Typography>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

export default StationFacilitiesModal;
