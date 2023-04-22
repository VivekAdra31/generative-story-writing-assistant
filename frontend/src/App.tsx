import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import Layout from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import { Textarea,HoverCard,Overlay,AspectRatio,Text,Group,Pagination,Button,Center,ActionIcon } from '@mantine/core';
import { Plus  } from 'tabler-icons-react';
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
        {/*<div className="flex">*/}
            <Layout {...states[activePage-1]} key={activePage}/>
        {/*</div>*/}
      <Center className="py-5">
          {/*<div className="flex">*/}
              <ActionIcon variant="transparent" disabled={true} className="plusButton">
              </ActionIcon>
              <Pagination value={activePage} onChange={setPage} total={numPages} />
              <ActionIcon variant="subtle" color="blue" onClick={addPageHandler} className="plusButton">
                  <Plus />
              </ActionIcon>
          {/*</div>*/}
      </Center>
      {/* <br />
      <Center >
      <Button onClick={addPageHandler}>Add New Page</Button>
      </Center>
       */}
    </div>

  );
}

export default App;
