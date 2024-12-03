import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Divider,
  InputAdornment,
} from '@mui/material';
import { Person, Email, Phone, Lock, CalendarToday, Home, LocationOn, Map, Flag, PinDrop} from '@mui/icons-material';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    dob: '',
    mobile: '',
    password: '',
    addressName: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    city: '',
    state: '',
    pinCode: '',
  });

  // Error State
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    gender: '',
    dob: '',
    mobile: '',
    password: '',
    addressName: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    city: '',
    state: '',
    pinCode: '',
  });

  // Validation for Step 1
  const validateStepOne = () => {
    const newErrors = {
        ...errors,
      fullName: /^[A-Za-z\s]+$/.test(formData.fullName) ? '' : 'Full name should only contain alphabets.',
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/.test(formData.email) ? '' : 'Enter a valid email.',
      gender: formData.gender ? '' : 'Please select a gender.',
      dob:
        /^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob) &&
        new Date().getFullYear() - new Date(formData.dob).getFullYear() >= 18
          ? ''
          : 'You must be at least 18 years old.',
      mobile: /^[6-9]\d{9}$/.test(formData.mobile) ? '' : 'Enter a valid 10-digit mobile number.',
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/.test(formData.password)
        ? ''
        : 'Password must be 7-20 characters with uppercase, lowercase, digit, and special character.',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err); // Check if all fields in step 1 are valid
  };

  const validateStepTwo = () => {
    const newErrors = {
      ...errors,
      addressName: formData.addressName.trim() !== '' ? '' : 'Address name is required (e.g., Home, Work).',
      addressLine1: formData.addressLine1.trim() !== '' ? '' : 'Address Line 1 is required (e.g., House No, Street).',
      addressLine2: formData.addressLine2.trim() !== '' ? '' : 'Address Line 2 is required (e.g., Street, Landmark).',
      area: formData.area.trim() !== '' ? '' : 'Area is required.',
      city: formData.city.trim() !== '' ? '' : 'City is required.',
      state: formData.state ? '' : 'Please select a state.',
      pinCode: /^[1-9]{1}[0-9]{5}$/.test(formData.pinCode) ? '' : 'Pin code must be a 6-digit number starting with a non-zero digit.',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err); // Check if all fields in step 2 are valid
  };


  // Handler for form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for Next Button
  const handleNext = () => {
    if (step === 1 && validateStepOne()) {
      setStep(2);
    }
    else if (step === 2 && validateStepTwo()) {
        setStep(3);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '50px auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
        <Box
          sx={{
            bgcolor: '#003161',
            color: '#fff',
            textAlign: 'center',
            py: 2,
            borderRadius: '4px 4px 0 0',
          }}
        >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Provide Your Details
          </Typography>
        </Box>


      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, marginTop:2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: step === 1 ? '#003161' : '#ccc',
              color: '#fff',
              borderRadius: '50%',
              width: 30,
              height: 30,
              textAlign: 'center',
              lineHeight: '30px',
            }}
          >
            1
          </Box>
          <Typography sx={{ ml: 1, fontWeight: step === 1 ? 'bold' : 'normal' }}>Sign Up</Typography>
        </Box>
        <Divider sx={{ flexGrow: 1, mx: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: step === 2 ? '#003161' : '#ccc',
              color: '#fff',
              borderRadius: '50%',
              width: 30,
              height: 30,
              textAlign: 'center',
              lineHeight: '30px',
            }}
          >
            2
          </Box>
          <Typography sx={{ ml: 1, fontWeight: step === 2 ? 'bold' : 'normal' }}>Address</Typography>
        </Box>
        <Divider sx={{ flexGrow: 1, mx: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: step === 3 ? '#003161' : '#ccc',
              color: '#fff',
              borderRadius: '50%',
              width: 30,
              height: 30,
              textAlign: 'center',
              lineHeight: '30px',
            }}
          >
            3
          </Box>
          <Typography sx={{ ml: 1, fontWeight: step === 3 ? 'bold' : 'normal' }}>Done</Typography>
        </Box>
      </Box>

      {step === 1 ? (
        <>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            error={!!errors.gender}
            helperText={errors.gender}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">--Select Your Gender--</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            error={!!errors.dob}
            helperText={errors.dob}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            sx={{ bgcolor: '#3652AD', color: '#fff', ':hover': { bgcolor: '#2d468d' } }}
          >
            Next
          </Button>
        </>) :
        (step === 2 && (
            <>
              <TextField
                fullWidth
                label="Address Name"
                name="addressName"
                value={formData.addressName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home/>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.addressName}
                helperText={errors.addressName}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Address Line 1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.addressLine1}
                helperText={errors.addressLine1}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Address Line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.addressLine2}
                helperText={errors.addressLine2}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Map />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.area}
                helperText={errors.area}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Map />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.city}
                helperText={errors.city}
                sx={{ mb: 2 }}
              />

              <TextField
                select
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Flag />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.state}
                helperText={errors.state}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">--Select State--</MenuItem>
                <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                <MenuItem value="Bihar">Bihar</MenuItem>
                <MenuItem value="Gujarat">Gujarat</MenuItem>
                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                {/* Add more states here */}
              </TextField>

              <TextField
                fullWidth
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.pinCode}
                helperText={errors.pinCode}
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={() => handleNext()} // Ensure handleNext is called once validation is passed
                sx={{ bgcolor: '#3652AD', color: '#fff', ':hover': { bgcolor: '#2d468d' } }}
              >
                Next
              </Button>
            </>)
        )}
    </Box>
    );
};

export default Register;
