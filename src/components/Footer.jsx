import React from "react";
import {
  Container,
  Typography,
  Link,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#282c34", color: "#fff", padding: "15px 0" }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={4}
        >
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              PSHOP
            </Typography>
            <Typography variant="body2">
              Delivering high-quality products that exceed our customers'
              expectations. We value innovation, quality, and sustainability.
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="#about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#services" color="inherit" underline="hover">
                Services
              </Link>
              <Link href="#careers" color="inherit" underline="hover">
                Careers
              </Link>
              <Link href="#contact" color="inherit" underline="hover">
                Contact Us
              </Link>
              <Link href="#support" color="inherit" underline="hover">
                Support
              </Link>
            </Stack>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Email: support@pshop.com</Typography>
            <Typography variant="body2">Phone: +123 456 7890</Typography>
            <Typography variant="body2">
              Address: 12 Aamrapali Tower, Surat
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} PSHOP. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
