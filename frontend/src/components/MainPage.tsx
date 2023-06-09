import React,{useState,useRef,useEffect} from 'react';
import { Row,Col } from 'react-bootstrap';
import { Button,Image } from '@mantine/core';
import './MainPage.css';
import { Textarea,HoverCard,Text,Group } from '@mantine/core';
import ContentEditable from 'react-contenteditable'
import axios from "axios";


interface stateHandler{
    pageNumber:number,
    textPrompt:string,
    typedText:string,
    selectedImage:number,
    imageList: string[],
    dataHandler:Function
  }

// Component for Main Page
function MainPage(currentPageInfo:stateHandler) {

    // Add All State Variables Here
    console.log("Recieved in MainPage",currentPageInfo)
    // const [generatedImages,generatedImagesHandler]= useState({image1:"../Images/Image.jpeg",image2:"../Images/Image.jpeg",image3:"../Images/Image.jpeg",image4:"../Images/Image.jpeg",image5:"../Images/Image.jpeg",image6:"../Images/Image.jpeg"})
    
    const [textPrompt, textPromptChangeHandler] = useState(currentPageInfo.textPrompt);
    const [selectedText, selectedTextChangeHandler] = useState("");
    const [suggestedText, setSuggestedText] = useState("");
    const [suggestedTextStartIndex,setsuggestedTextStartIndex] = useState(0);
    let typedText = useRef(currentPageInfo.typedText);
    const [buttonDisabled, setbuttonDisabled] =  useState(false);
    const [selectedImage,setSelectedImage] = useState(currentPageInfo.selectedImage);
    const [imageList,setImageList] = useState<string[]>(currentPageInfo.imageList);
    // const [imageTest1,imageTestHandler] = useState("https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+")
    const [rerendertrial, rerendertrialfunction] = useState(true)

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        currentPageInfo.dataHandler({pageNumber:currentPageInfo.pageNumber,textPrompt:textPrompt,typedText:typedText.current,selectedImage:selectedImage,imageList:imageList,dataHandler:currentPageInfo.dataHandler})
      }, [textPrompt,typedText.current,selectedImage,imageList]);

    // Function to save The Entered Text 
    const textSaver = (evt: { target: { value: string; }; }) => {
        typedText.current = evt.target.value;
        console.log(typedText.current)
        selectedTextChangeHandler(evt.target.value);
    };

    let imageArray = [1,2];
    const imageMapperRow1 = imageArray.map((number, index) => {
        return (
        <Col key={number} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex justify-content-center">
            <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
                <HoverCard.Target>
                <Image src={imageList[number-1]} width={256} height={256} radius="md"  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{setSelectedImage(number)}} className={number==selectedImage?"suggestedImages Selected":"suggestedImages"} withPlaceholder
                    placeholder={<Text align="center">Generate Illustrations!</Text>}/>
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
                <Image src={imageList[1+number]} radius="md"  width={256} height={256} onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{setSelectedImage(2+number)}} className={2+number==selectedImage?"suggestedImages Selected":"suggestedImages"} withPlaceholder
                    placeholder={<Text align="center">Generate Illustrations!</Text>}/>
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

    // Highlighted Text is Selected
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


    // Save Text for Generating Images
    const textSaverPrompt = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        textPromptChangeHandler(ev.target.value);
        // console.log("Total Text:",text);
        // console.log("Selected text:" ,selectedText);
    }


    // Function Called to Send The Text to the Backend for ChatGPT
    const sendTextToBackendText = async () => {
        console.log("Sending This Text to GPT:",selectedText);
        var TextReturnedByChatGPT = "";
        let regex = /&(nbsp|amp|quot|lt|gt);/g;
        let query = selectedText.replace(regex, "");
        console.log("Sending This Text to GPT After Filtering:",query);
        
        await axios.post('http://127.0.0.1:5000/api/complete_text', {'text':query})
          .then(function (response) {
            console.log(response.data.text);
            TextReturnedByChatGPT=response.data.text;
          })
          .catch(function (error) {
            TextReturnedByChatGPT="Server Error";
          });

        if (query.slice(-1)!=" "){
            TextReturnedByChatGPT = ' ' + TextReturnedByChatGPT;
        };
        console.log(TextReturnedByChatGPT)
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

    // Functions that send the Image Prompt to the Backend
    const sendTextToBackendImage = async () => {
        console.log("Sending This Text to DALLE:",textPrompt);
        await axios.post('http://127.0.0.1:5000/api/get_image', {imagePrompt:textPrompt})
          .then(function (response) {
            console.log(response.data.image1);
            imageList[0]=response.data.image1;
            imageList[1]=response.data.image2;
            imageList[2]=response.data.image3;
            imageList[3]=response.data.image4;
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(imageArray[0]);
        // console.log(imageArray[1]);
        // console.log(imageArray[2]);
        // console.log(imageArray[3]);
        setImageList(imageList);
        console.log(imageList)
        // console.log(imageArray)
        setSelectedImage(0);
        rerendertrialfunction(!rerendertrial);
    }

    

    // Final App Page
    // FIX SELECTOR THING
  return (
    <div key = {currentPageInfo.pageNumber} className="MainPage">
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
                {!buttonDisabled?null:<Button className="Button GenerateText" onClick={rejectSuggestedText} size="md" color="red">Reject Text</Button>}
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
            </Row>
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
              {imageMapperRow1}
             <Col  xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex justify-content-center">
        </Col>
            </Row>
            
            <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
            {imageMapperRow2}
            </Row>
            
            </Col>
        </Row>
                
    </div>
  );
}

export default MainPage;
