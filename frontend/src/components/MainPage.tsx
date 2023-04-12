import React,{useState,useRef} from 'react';
import { Container,Row,Col,Card,Button,Image } from 'react-bootstrap';
import './MainPage.css';
import logo from "../logo.svg";
import {Document,Paragraph,Packer,TextRun} from 'docx';
import { saveAs } from "file-saver";
import ContentEditable from 'react-contenteditable'


// Component for Main Page
function MainPage() {

    // Add All State Variables Here
    const [text, textChangeHandler] = useState("");
    const [selectedText, selectedTextChangeHandler] = useState("");
    const [suggestedText, setSuggestedText] = useState("");
    const [suggestedTextStartIndex,setsuggestedTextStartIndex] = useState(0);
    let typedText = useRef("");
    const [buttonDisabled, setbuttonDisabled] =  useState(false);


    const textSaver = (evt: { target: { value: string; }; }) => {
        typedText.current = evt.target.value;
        console.log(typedText.current)
        selectedTextChangeHandler(evt.target.value);
    };

    const handleBlur = () => {
        console.log(typedText.current);
    };

    const textSelector = (e: React.MouseEvent<HTMLDivElement>) => {
        let answer: string;
        answer = window!.getSelection()!.toString();
        
        if (answer!=null){
            if(answer==""){
                selectedTextChangeHandler(text);
            }
            else{
            selectedTextChangeHandler(answer);
            console.log(window!.getSelection()!.rangeCount);
            }
        }
        // console.log("Selected text:" ,selectedText);
    }

    // const textSaver = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     textChangeHandler(ev.target.value);
    //     selectedTextChangeHandler(ev.target.value);
    //     // console.log("Total Text:",text);
    //     // console.log("Selected text:" ,selectedText);
    // }

    const sendTextToBackendText = () => {
        console.log("Sending This Text to GPT:",selectedText);
        const TextReturnedByChatGPT = "THIS IS THE RETURNED TEXT";
        const newText = '<span class="greyed">'+TextReturnedByChatGPT+"</span>";

        setSuggestedText(TextReturnedByChatGPT);
        setsuggestedTextStartIndex(typedText.current.length);
        setbuttonDisabled(true);
        textSaver({target:{value:typedText.current + newText}});
        console.log(typedText.current)
    }
    
    const acceptSuggestedText = () => {
        const finalText = typedText.current.slice(0,suggestedTextStartIndex) + suggestedText;
        textSaver({target:{value:finalText}});
        setbuttonDisabled(false);
    }

    const rejectSuggestedText = () => {
        const finalText = typedText.current.slice(0,suggestedTextStartIndex);
        textSaver({target:{value:finalText}});
        setbuttonDisabled(false);
    }

    const sendTextToBackendImage = () => {
        console.log("Sending This Text to DALLE:",selectedText);
    }

    // Fill in this function to modify word document
    const generate = () =>  {
        const doc = new Document({
                        sections: [{
                            properties: {},
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun(text)
                                    ],
                                 }),
                            ],
                         }]
                    });
    
        Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, "Book.docx");
          console.log("Document created successfully");
        });
      };

    // Final App Page
    // FIX SELECTOR THING
  return (
    <div className="MainPage">
        <Row className = "Row" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Col className="Column one" xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="TextArea">
            <ContentEditable onPointerUp={textSelector} className="TextBox" html={typedText.current} onBlur={handleBlur} onChange={textSaver} />
                {/* <textarea className='TextBox' onPointerUp={textSelector}  onChange={textSaver}
                    value={text}
                /> */}
            <div className="SubmitButtonWrapper">
                {!buttonDisabled?<Button className="Button GenerateText" variant="primary" size="lg" onClick={sendTextToBackendText}>Generate Text</Button>:<Button className="Button GenerateText"  variant="primary" size="lg" onClick={acceptSuggestedText}>Accept Suggestions</Button>}
                {!buttonDisabled?<Button className="Button Publish" disabled={buttonDisabled} variant="primary" size="lg" onClick={generate}>Publish</Button>:<Button className="Button GenerateText"  variant="primary" size="lg" onClick={rejectSuggestedText}>Reject Suggestion</Button>}
                {/* <Button className="Button Publish" disabled={buttonDisabled} variant="primary" size="lg" onClick={generate}>Publish</Button> */}
            
            {/* <Button className="Button GenerateText" disabled={!buttonDisabled} variant="primary" size="lg" onClick={saveGivenText}>Generate Text</Button> */}
            </div>
           
            </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <textarea value={selectedText}
                />
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
            <div className="SubmitButtonWrapper">
            <Button className="Button GenerateImages" variant="primary" size="lg" onClick={sendTextToBackendImage}>Generate Illustrations</Button>
            </div>
            
            </Col>
        </Row>
    </div>
  );
}

export default MainPage;
