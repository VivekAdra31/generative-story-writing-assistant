import React from 'react';
// import logo from '../logo.svg';
import { Container,Row,Col,Card,Button,Image } from 'react-bootstrap';
// import './App.css';
import './Layout.css';
import logo from "../logo.svg";

function Layout() {
  return (
    <div className="MainPage">
        <Row className = "Row" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Col className="Column one" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div className="TextArea">
                <textarea className='TextBox'
                    value={"HELLO I AM VIVEK HELLO HELLO BUDDY BYDDY HHHHHHhhhhhhhhhhhhhhhhhghghghhghhhghgghghghghhghh HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO"}
                />
            <div className="SubmitButtonWrapper">
                <Button className="Button" variant="primary" size="lg">Save Writing</Button>
            </div>
           
            </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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

export default Layout;
