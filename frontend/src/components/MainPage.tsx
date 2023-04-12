import React,{useState} from 'react';
import { Container,Row,Col,Card,Button,Image } from 'react-bootstrap';
import './MainPage.css';
import logo from "../logo.svg";


// Component for Main Page
function MainPage() {
    // Add All State Variables Here
    const [text, textChangeHandler] = useState("");
    const [selectedText, selectedTextChangeHandler] = useState("");
    
    const textSelector = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        let answer: string;
        answer = window!.getSelection()!.toString();
        
        if (answer!=null){
            if(answer==""){
                selectedTextChangeHandler(text);
            }
            else{
            selectedTextChangeHandler(answer);
            }
        }
        console.log("Selected text:" ,selectedText);
    }

    const textSaver = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        textChangeHandler(ev.target.value);
        selectedTextChangeHandler(ev.target.value);
        console.log("Total Text:",text);
        console.log("Selected text:" ,selectedText);
    }

    const sendTextToBackendText = () => {
        console.log("Sending This Text to GPT:",selectedText);
    }

    const sendTextToBackendImage = () => {
        console.log("Sending This Text to DALLE:",selectedText);
    }
    // Final App Page
    // FIX SELECTOR THING
  return (
    <div className="MainPage">
        <Row className = "Row" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Col className="Column one" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="TextArea">
            
                <textarea className='TextBox' onClick={textSelector}  onChange={textSaver}
                    value={text}
                />
            <div className="SubmitButtonWrapper">
            <Button className="Button GenerateText" variant="primary" size="lg" onClick={sendTextToBackendText}>Generate Text</Button>
                <Button className="Button" variant="primary" size="lg" onClick={sendTextToBackendImage}>Generate Illustrations</Button>
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
