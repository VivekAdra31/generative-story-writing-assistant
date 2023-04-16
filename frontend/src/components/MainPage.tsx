import React,{useState,useRef} from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';
import { Button,Image } from '@mantine/core';
import './MainPage.css';
import image from "../Images/Image.jpeg";
import {Document,Paragraph,Packer,TextRun} from 'docx';
import { saveAs } from "file-saver";
import { Textarea,HoverCard,Overlay,AspectRatio,Text,Group } from '@mantine/core';
import ContentEditable from 'react-contenteditable'
import axios from "axios";
import { ClassNames } from '@emotion/react';


// Component for Main Page
function MainPage() {

    // Add All State Variables Here

    // const [generatedImages,generatedImagesHandler]= useState({image1:"../Images/Image.jpeg",image2:"../Images/Image.jpeg",image3:"../Images/Image.jpeg",image4:"../Images/Image.jpeg",image5:"../Images/Image.jpeg",image6:"../Images/Image.jpeg"})
    const [textPrompt, textPromptChangeHandler] = useState("");
    const [selectedText, selectedTextChangeHandler] = useState("");
    const [suggestedText, setSuggestedText] = useState("");
    const [suggestedTextStartIndex,setsuggestedTextStartIndex] = useState(0);
    let typedText = useRef("");
    const [buttonDisabled, setbuttonDisabled] =  useState(false);
    const [selectedImage,setSelectedImage] = useState(0);

    const textSaver = (evt: { target: { value: string; }; }) => {
        typedText.current = evt.target.value;
        console.log(typedText.current)
        selectedTextChangeHandler(evt.target.value);
    };
    let imageArray = [1,2];
    
    const imageMapperRow1 = imageArray.map((number, index) => {
        return (
        <Col key={2+number} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex justify-content-center">
            <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
                <HoverCard.Target>
                <Image src={image} radius="md" withPlaceholder  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{setSelectedImage(number)}} className={number==selectedImage?"suggestedImages Selected":"suggestedImages"}/>
                </HoverCard.Target>
            <HoverCard.Dropdown>
            <Group position="center">
                <Text size="sm">
                    Click to Select This Illustration for this Page
                </Text>
                {/* <Button onClick={(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>(console.log(number))}>Choose</Button> */}
            </Group>
            </HoverCard.Dropdown>
            
            </HoverCard>     
        </Col>
        );
    })

    const imageMapperRow2 = imageArray.map((number, index) => {
        return (
        <Col key={2+number} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex justify-content-center">
            <HoverCard width={320} shadow="md" withArrow openDelay={100} closeDelay={400}>
                <HoverCard.Target>
                <Image src={image} radius="md" withPlaceholder  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{setSelectedImage(2+number)}} className={2+number==selectedImage?"suggestedImages Selected":"suggestedImages"}/>
                </HoverCard.Target>
            <HoverCard.Dropdown>
            <Group position="center">
                <Text size="sm">
                    Click to Select This Illustration for this Page
                </Text>
                {/* <Button onClick={(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>(console.log(number))}>Choose</Button> */}
            </Group>
            </HoverCard.Dropdown>
            
            </HoverCard>     
        </Col>
        );
    })

    const textSelector = (e: React.MouseEvent<HTMLDivElement>) => {
        let answer: string;
        answer = window!.getSelection()!.toString();
        
        if (answer!=null){
            if(answer==""){
                selectedTextChangeHandler(typedText.current);
            }
            else{
            selectedTextChangeHandler(answer);
            // console.log(window!.getSelection()!.rangeCount);
            }
        }
        // console.log("Selected text:" ,selectedText);
    }

    const textSaverPrompt = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        textPromptChangeHandler(ev.target.value);
        // console.log("Total Text:",text);
        // console.log("Selected text:" ,selectedText);
    }

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
        console.log("Sending This Text to DALLE:",textPrompt);
        setSelectedImage(0);

    }

    // Fill in this function to modify word document
    const generate = () =>  {
        const doc = new Document({
                        sections: [{
                            properties: {},
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun(typedText.current)
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
            <ContentEditable onPointerUp={textSelector} className="TextBox" html={typedText.current} onChange={textSaver} data-placeholder="Enter Your Story Text Here"/>
                {/* <textarea className='TextBox'  onChange={textSaver}
                    value={text}
                /> */}
                {/* className="Button GenerateText" variant="primary" size="lg" */}
            <div className="SubmitButtonWrapper">
                {!buttonDisabled?<Button className="Button GenerateText" size="md" onClick={sendTextToBackendText}>Generate Text</Button>:<Button className="Button GenerateText" size="md" onClick={acceptSuggestedText} color="green">Accept Text</Button>}
                {!buttonDisabled?<Button className="Button GenerateText" size="md" onClick={generate}>Publish</Button>:<Button className="Button GenerateText" onClick={rejectSuggestedText} size="md" color="red">Reject Text</Button>}
                {/* <Button className="Button Publish" disabled={buttonDisabled} variant="primary" size="lg" onClick={generate}>Publish</Button> */}
            
            {/* <Button className="Button GenerateText" disabled={!buttonDisabled} variant="primary" size="lg" onClick={saveGivenText}>Generate Text</Button> */}
            </div>
           
            </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
            <Textarea
                placeholder="Enter a Descriptive Prompt About Your Characters/ Background about the Image you want"
                autosize
                minRows={2}
                maxRows={4}
                className="textAreaImage"
                onChange={textSaverPrompt} value={textPrompt} />
                <Button className='GenerateImageButton' onClick={sendTextToBackendImage}>Generate Illustrations</Button>
               {/* <textarea className="TextBoxImage" onChange={textSaverPrompt} value={textPrompt}/> */}
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
             {imageMapperRow1}
            </Row>
            
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
            {imageMapperRow2}
            </Row>
            {/* <div className="SubmitButtonWrapper">
            <Button className="Button GenerateImages" variant="primary" size="lg" onClick={sendTextToBackendImage}>Generate Illustrations</Button>
            </div> */}
            
            </Col>
        </Row>
                {/* require(JSON.stringify(generatedImages.image1)) */}
    </div>
  );
}

export default MainPage;
