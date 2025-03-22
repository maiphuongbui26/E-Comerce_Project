import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', color: '#333', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: '1240px', mx: 'auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Contact Information */}
        <Box sx={{ flex: '1 1 300px', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Us</Typography>
          <Typography>Phone: (123) 456-7890</Typography>
          <Typography>Email: support@ecommerce.com</Typography>
          <Typography>Address: 123 E-commerce St, Shop City</Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: '1 1 300px', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
          <Link href="/about" sx={{ display: 'block', color: '#333', textDecoration: 'none', mb: 1 }}>About Us</Link>
          <Link href="/contact" sx={{ display: 'block', color: '#333', textDecoration: 'none', mb: 1 }}>Contact</Link>
          <Link href="/faq" sx={{ display: 'block', color: '#333', textDecoration: 'none', mb: 1 }}>FAQ</Link>
        </Box>

        {/* Social Media */}
        <Box sx={{ flex: '1 1 300px', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Follow Us</Typography>
          <IconButton href="https://facebook.com" sx={{ color: '#333' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://twitter.com" sx={{ color: '#333' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://instagram.com" sx={{ color: '#333' }}>
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;