import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import Layout from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import { Textarea,HoverCard,Overlay,AspectRatio,Text,Group,Pagination,Button,Center,ActionIcon } from '@mantine/core';
import { Plus  } from 'tabler-icons-react';
import {Document,Paragraph,Packer,TextRun, SectionType,ImageRun } from 'docx';
import { saveAs } from "file-saver";

function App() {
  const [activePage, setPage] = useState(1);
  interface stateHandler{
    pageNumber:number,
    textPrompt:string,
    typedText:string,
    selectedImage:number,
    imageList: string[],
    dataHandler:Function
  }
  const childToParent = (childData:stateHandler) => {
   console.log("Recieved In APP previous:",states)
   let tempArray = states;
   tempArray[childData.pageNumber-1] = childData;
   statesSetter(tempArray);
   console.log("Recieved In APP:",states)
  }
  const [numPages,setNumPages] = useState(1);
  const [states,statesSetter] = useState<stateHandler[]>([{pageNumber:1,textPrompt:"",typedText:"",selectedImage:0,imageList:[],dataHandler:childToParent}])
  const addPageHandler = () => {
    states.push({pageNumber:numPages+1,textPrompt:"",typedText:"",selectedImage:0,imageList:["","","",""],dataHandler:childToParent});
    console.log("Adding New Page States:",states)
    setNumPages(numPages+1);
  }

  // Fake Export Button to get it working
  const exportBook = async() => {

    // Fetch Image from first page to test
    const blob = await fetch(
      "https://cors-anywhere.herokuapp.com/"+states[0].imageList[0],{
        method: "GET",
        headers: {}
      }
    ).then((r) => r.blob());

    // Putting Text from Every Page into a Paragraph 
    const paragraphArray: Paragraph[] = [];
    
    // paragraphArray.push(new Paragraph({
    //   children: [
    //     new ImageRun({
    //       data: await blob.arrayBuffer(),
    //       transformation: {
    //         width: 256,
    //         height: 256,
    //       },
    //     }),
    //   ],
    // }));

    // paragraphArray.push(new Paragraph({
    //   children: [
    //     new ImageRun({
    //       data: await blob.arrayBuffer(),
    //       transformation: {
    //         width: 256,
    //         height: 256,
    //       },
    //     }),
    //   ],
    // }));

    // states.forEach(async (arrayItem:stateHandler)=>{
    //   // paragraphArray.push(new Paragraph(arrayItem.typedText));
    //   paragraphArray.push(new Paragraph({
    //     children: [
    //       new ImageRun({
    //         data: await blob.arrayBuffer(),
    //         transformation: {
    //           width: 256,
    //           height: 256,
    //         },
    //       }),
    //     ],
    //   }))
    // })
    
    for (let item of states) {
      paragraphArray.push(new Paragraph(item.typedText));

      if(item.selectedImage>0){
        const blob = await fetch(
          "https://cors-anywhere.herokuapp.com/"+item.imageList[item.selectedImage-1],{
            method: "GET",
            headers: {}
          }
        ).then((r) => r.blob());

        paragraphArray.push(new Paragraph({
          children: [
            new ImageRun({
              data: await blob.arrayBuffer(),
              transformation: {
                width: 256,
                height: 256,
              },
            }),
          ],
        }));
      }
    }

    console.log(paragraphArray);
  
    // Creating a Document with all the Paragraphs
    const doc = new Document({
      sections: [
        {
          children: paragraphArray,
        },
      ],
    });
  
    // Downloading the document
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  }


  const changePageHandler = (newPage:number) => {
    
  }


  return (
    <div className="Routes">
      <Navigation {...states}/>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Routes>
        <Route path="/" element = {<Layout />}/>
      </Routes>  */}
        <div>
            <Layout {...states[activePage-1]} key={activePage}/>
        </div>
      <Center>
          {/*<div className="flex">*/}
              <ActionIcon variant="transparent" disabled={true} className="plusButton">
              </ActionIcon>
              <Pagination value={activePage} onChange={setPage} total={numPages} />
              <ActionIcon variant="subtle" color="blue" onClick={addPageHandler} className="plusButton">
                  <Plus />
              </ActionIcon>
          {/*</div>*/}
      </Center>
      <Button onClick={exportBook}>Export Book</Button>
      {/* <br />
      <Center >
      <Button onClick={addPageHandler}>Add New Page</Button>
      </Center>
       */}
    </div>

  );
}

export default App;
