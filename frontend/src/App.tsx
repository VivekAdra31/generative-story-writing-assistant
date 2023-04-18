import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import Layout from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import { Textarea,HoverCard,Overlay,AspectRatio,Text,Group,Pagination,Button } from '@mantine/core';

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
   states[activePage-1] = childData;
   console.log("Recieved In APP:",states)
  }
  const [numPages,setNumPages] = useState(1);
  const [states,statesSetter] = useState<stateHandler[]>([{pageNumber:1,textPrompt:"",typedText:"I am Vivek",selectedImage:0,imageList:[],dataHandler:childToParent}])
  const addPageHandler = () => {
    setNumPages(numPages+1);
    states.push({pageNumber:100,textPrompt:"",typedText:"I am Vivek",selectedImage:0,imageList:[],dataHandler:childToParent});
    // console.log(newPage)
    // if (newPage<=states.length&& newPage>=1){
    //   setPage(newPage);
    // }
    // else{
    //   states.push({textPrompt:"",typedText:"I am Vivek",selectedImage:0,imageList:[],dataHandler:childToParent})
    // }
  }

  const changePageHandler = (newPage:number) => {
    
  }


  return (
    <div className="Routes">
      <Navigation />

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
      <Layout {...states[activePage-1]} key={activePage}/>
      <Button onClick={addPageHandler}>Add New Page</Button>
      <Pagination value={activePage} onChange={setPage} total={numPages} />
    </div>

  );
}

export default App;
