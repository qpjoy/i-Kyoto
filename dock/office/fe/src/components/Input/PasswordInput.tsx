import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import "./PasswordInput.module.css";

const PasswordInput = ({ password, handlePassword }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      variant="standard"
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
      margin="normal"
      size="small"
      type={showPassword ? "text" : "password"}
      //   label="Password"
      value={password}
      onChange={handlePassword}
      // required={true}
      InputProps={{
        disableUnderline: true,
        sx: {
          display: "flex",
          padding: "0 1rem",
          fontSize: "20px",
          height: 50,
          minWidth: 300,
          backgroundColor: "#f3f3f3"
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth
    />
  );
};

export default PasswordInput;
