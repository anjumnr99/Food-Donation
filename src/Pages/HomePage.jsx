import { CardContent, Typography } from "@mui/material";
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import donationIllustration from '../assets/food-donation-illustration-download-in-svg-png-gif-file-formats--poor-humanitarian-homeless-charity-and-pack-miscellaneous-illustrations-8249229.png';

const HomePage = () => {
    return (
        <div className="px-10" style={{ backgroundColor: '#A9F48E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container style={{ flexGrow: 1 }}>
        {/* Top Section (Text & Illustration) */}
        <div className="flex flex-row justify-between items-center gap-4 w-full mx-auto" >
          <div className="flex-1 ">
            <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '2.5rem' }}>
              Bridging the gap between food waste and hunger.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '24px', fontSize: '1.25rem' }}>
              Let us nourish the nation together by connecting food banks, shelters and orphanages with the organizations discarding surplus food every day. 
              With just a few clicks, you can feed the needy, save water, reduce food waste and minimize environmental damage.
            </Typography>
          </div>
          <div className="flex-1">
            <img
              src={donationIllustration}
              alt="Donation Illustration"
              style={{ maxWidth: '90%', height: 'auto' }}
            />
          </div>
        </div>
      </Container>

      {/* Donate Food and Obtain Food Cards Section */}
      <Container style={{ paddingBottom: '20px' }}>
        <Row style={{ justifyContent: 'center', paddingBottom: '20px' }}>
          {/* Donate Food Card */}
          <Col md={6} style={{ paddingBottom: '16px' }}>
            <div style={{ maxWidth: '700px', marginLeft: '0' }}>
              <Link to="/donate-food" style={{ textDecoration: 'none' }}>
                <Card elevation={3} style={{
                  marginBottom: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  width: '100%',
                  maxWidth: '700px',
                  marginLeft: '0',    
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  padding: '24px',  
                }}>
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#FF4A4A', fontWeight: 'bold' }}>
                      Donate Food →
                    </Typography>
                    <Typography variant="body2">
                      Companies, restaurants, businesses or any individual can donate.
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </Col>

          {/* Obtain Food Card */}
          <Col md={6} style={{ paddingBottom: '16px' }}>
            <div style={{ maxWidth: '700px', marginLeft: '0' }}>
              <Link to="/obtain-food" style={{ textDecoration: 'none' }}>
                <Card elevation={3} style={{
                  marginBottom: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  width: '100%',
                  maxWidth: '700px',  
                  marginLeft: '0',    
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  padding: '24px',  
                }}>
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#7C4DFF', fontWeight: 'bold' }}>
                      Obtain Food →
                    </Typography>
                    <Typography variant="body2">
                      Nonprofits can view and claim available donations or make requests.
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    );
};

export default HomePage;