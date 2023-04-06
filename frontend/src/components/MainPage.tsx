import React,{useState} from 'react';
import { Container,Row,Col,Card,Button,Image } from 'react-bootstrap';
import './MainPage.css';
import logo from "../logo.svg";


// Component for Main Page
function MainPage() {
    // Add All State Variables Here
    const [text, textChangeHandler] = useState("");
    
    // Final App Page
  return (
    <div className="MainPage">
        <Row className = "Row" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Col className="Column one" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="TextArea">
                <textarea className='TextBox' onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {textChangeHandler(ev.target.value)}}
                    value={text}
                />
            <div className="SubmitButtonWrapper">
            <Button className="Button GenerateText" variant="primary" size="lg">Generate Text</Button>
                <Button className="Button" variant="primary" size="lg">Generate Illustrations</Button>
            </div>
           
            </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className="d-flex justify-content-center">
                    <Image className = "img" src={logo} rounded/>
                </Col>
            </Row>
            </Col>
        </Row>
    </div>
  );
}

export default MainPage;
