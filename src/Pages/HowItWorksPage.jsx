
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HowItWorksPage = () => {
    return (
        <div style={{ backgroundColor: '#E6F7EC', minHeight: '100vh', paddingTop: '40px' }}>
            <Container>
                <Row>
                    <Col>
                        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                            HOW GIVEGRUB WORKS
                        </Typography>
                        <Typography variant="body1" align="center" style={{ marginBottom: '40px' }}>
                            Our platform serves as the vital link between vendors with surplus food and the non-profits
                            that will distribute it to those who need it most. By continuously tracking donations, we can
                            measure how much food and water is saved and how many people benefit.
                        </Typography>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Typography variant="h6" gutterBottom style={{ color: '#1DB954', fontWeight: 'bold' }}>
                            — For Companies
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#1DB954' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Post food donation"
                                    secondary="If there’s any surplus food you want to give, just post it here. Or respond to a specific request."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#1DB954' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Receive updates"
                                    secondary="Get notified once food is claimed and wait for it to be picked by a nonprofit."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#1DB954' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Track your impact"
                                    secondary="Track the environmental impact of your food donations through your personalized dashboard."
                                />
                            </ListItem>
                        </List>
                    </Col>
                    <Col md={6}>
                        <Typography variant="h6" gutterBottom style={{ color: '#007BFF', fontWeight: 'bold' }}>
                            — For Nonprofits
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#007BFF' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Make requests"
                                    secondary="View and claim available nearby food donations or make specific requests."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#007BFF' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Receive updates"
                                    secondary="Get notified once a request is accepted and schedule your pickup."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon style={{ color: '#007BFF' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Rations received"
                                    secondary="Once you’ve picked up the necessary rations, distribute to needy people in your organization or to people on the streets."
                                />
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HowItWorksPage;