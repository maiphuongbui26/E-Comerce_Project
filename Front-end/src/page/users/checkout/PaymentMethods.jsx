import {
    Box,
    Typography,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    Divider,
  } from "@mui/material";
  import LocalShippingIcon from '@mui/icons-material/LocalShipping';
  import PaymentIcon from '@mui/icons-material/Payment';
  
  const PaymentMethods = ({ value, onChange }) => {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Phương thức thanh toán
        </Typography>
        <RadioGroup
          name="paymentMethod"
          value={value}
          onChange={onChange}
        >
          <Stack spacing={2}>
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalShippingIcon sx={{ color: '#303030' }} />
                  <Box>
                    <Typography>Thanh toán khi nhận hàng (COD)</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Miễn phí vận chuyển cho mọi đơn hàng trên 500.000đ
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
  
            <FormControlLabel
              value="vnpay"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    component="img" 
                    src="../../../../public/image/vnpay.jpg"
                    sx={{ width: 28, height: 28 }}
                  />
                  <Box>
                    <Typography>Thanh toán qua VNPAY</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thanh toán qua Internet Banking, Visa, Master, JCB
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
          </Stack>
        </RadioGroup>
      </Paper>
    );
  };
  
  export default PaymentMethods;