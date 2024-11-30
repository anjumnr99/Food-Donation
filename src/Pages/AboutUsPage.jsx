
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Box, Paper } from '@mui/material';
import donationImage from "../assets/000_9GJ2LJ.jpg.webp";

const AboutUsPage = () => {
    return (
        <div style={{ backgroundColor: '#9CC6E0', minHeight: '100vh', padding: '40px 0' }}>
      <Container>
        {/* Header Section */}
        <Row>
          <Col>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
              Annually, at least 82 kg of food is wasted in Bangladesh. 
              783 million people remain hungry every day.
            </Typography>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Typography
              variant="body1"
              align="center"
              style={{
                marginBottom: '40px',
                fontSize: '1.25rem', 
                lineHeight: '1.8', 
                fontWeight: '500',
              }}
            >
              Our ultimate goal is to reduce food waste while helping those in need. With the ever-growing number
              of restaurants, especially in Dhaka, we aim to divert the food waste from these places to food banks,
              shelters, orphanages, or anyone else in need, instead of ending up in landfills and causing
              environmental pollution. We hope to encourage more and more communities to participate in joining
              the impact.
            </Typography>
          </Col>
        </Row>

     
        <Row>
          <Col md={6} style={{ paddingRight: '20px' }}>
            
            <Paper elevation={3} style={{ backgroundColor: '#9CC6E0', padding: '10px' }}>
              <img
                src={donationImage}
                alt="donationImage"
                style={{
                  width: '80%',  
                  marginBottom: '20px',
                  borderRadius: '5px',
                  display: 'block', 
                  marginLeft: '0',  
                }}
              />
            </Paper>
          </Col>

          <Col md={6}>
            <Box>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                [Insert No] kilograms of food rescued and donated
              </Typography>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                [Insert No] served with a nutritious meal
              </Typography>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                [Insert No] gallons of water saved
              </Typography>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                [Insert No] partners including businesses and nonprofits
              </Typography>
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
    );
};

export default AboutUsPage;