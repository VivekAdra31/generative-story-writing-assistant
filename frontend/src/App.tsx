import React,{useState} from 'react';
import './App.css';
import Layout from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import { Text,Pagination,Center,ActionIcon,Modal,List} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus  } from 'tabler-icons-react';

interface stateHandler{
  pageNumber:number,
  textPrompt:string,
  typedText:string,
  selectedImage:number,
  imageList: string[],
  dataHandler:Function
}

function App() {

  const [activePage, setPage] = useState(1);
  const [keyNav,keyNavSetter] = useState(true);
  const [numPages,setNumPages] = useState(1);
  const [opened, { open, close }] = useDisclosure(true);

  
  const childToParent = (childData:stateHandler) => {
   console.log("Recieved In APP previous:",states)
   let tempArray = states;
   tempArray[childData.pageNumber-1] = childData;
   statesSetter(tempArray);
   console.log("Recieved In APP:",states)
   keyNavSetter(!keyNav)
  }

  const [states,statesSetter] = useState<stateHandler[]>([{pageNumber:1,textPrompt:"",typedText:"",selectedImage:0,imageList:[],dataHandler:childToParent}]);

  const addPageHandler = () => {
    states.push({pageNumber:numPages+1,textPrompt:"",typedText:"",selectedImage:0,imageList:["","","",""],dataHandler:childToParent});
    console.log("Adding New Page States:",states)
    setNumPages(numPages+1);
  }

  // // Fake Export Button to get it working
  // const exportBook = async() => {

  //   // Fetch Image from first page to test
  //   // const blob = await fetch(
  //   //   "https://cors-anywhere.herokuapp.com/"+states[0].imageList[0],{
  //   //     method: "GET",
  //   //     headers: {}
  //   //   }
  //   // ).then((r) => r.blob());

  //   // Putting Text from Every Page into a Paragraph 
  //   const paragraphArray: Paragraph[] = [];
    
  //   // paragraphArray.push(new Paragraph({
  //   //   children: [
  //   //     new ImageRun({
  //   //       data: await blob.arrayBuffer(),
  //   //       transformation: {
  //   //         width: 256,
  //   //         height: 256,
  //   //       },
  //   //     }),
  //   //   ],
  //   // }));

  //   // paragraphArray.push(new Paragraph({
  //   //   children: [
  //   //     new ImageRun({
  //   //       data: await blob.arrayBuffer(),
  //   //       transformation: {
  //   //         width: 256,
  //   //         height: 256,
  //   //       },
  //   //     }),
  //   //   ],
  //   // }));

  //   // states.forEach(async (arrayItem:stateHandler)=>{
  //   //   // paragraphArray.push(new Paragraph(arrayItem.typedText));
  //   //   paragraphArray.push(new Paragraph({
  //   //     children: [
  //   //       new ImageRun({
  //   //         data: await blob.arrayBuffer(),
  //   //         transformation: {
  //   //           width: 256,
  //   //           height: 256,
  //   //         },
  //   //       }),
  //   //     ],
  //   //   }))
  //   // })
    
  //   for (let item of states) {
  //     paragraphArray.push(new Paragraph(item.typedText));

  //     if(item.selectedImage>0){
  //       const blob = await fetch(
  //         "https://cors-anywhere.herokuapp.com/"+item.imageList[item.selectedImage-1],{
  //           method: "GET",
  //           headers: {}
  //         }
  //       ).then((r) => r.blob());

  //       paragraphArray.push(new Paragraph({
  //         children: [
  //           new ImageRun({
  //             data: await blob.arrayBuffer(),
  //             transformation: {
  //               width: 256,
  //               height: 256,
  //             },
  //           }),
  //         ],
  //       }));
  //     }
  //   }

  //   console.log(paragraphArray);
  
  //   // Creating a Document with all the Paragraphs
  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: paragraphArray,
  //       },
  //     ],
  //   });
  
  //   // Downloading the document
  //   Packer.toBlob(doc).then((blob) => {
  //     console.log(blob);
  //     saveAs(blob, 'example.docx');
  //     console.log('Document created successfully');
  //   });
  // }

  return (
    <div className="Routes">
      <Modal.Root opened={opened} onClose={close} size="auto" centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Text
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz="xl"
                fw={700}
              >
                Generative Story Writer
              </Text>
            </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <List>
            <List.Item>Generative Story Writer is a Generative Machine Learning-based application that uses GPT-3 to generate text and DALLE-2 to generate Images.</List.Item>
            <List.Item>Users can use GPT-3 to autocomplete pieces of text and use the text as a basis for their writing or to spur different ideas for their own writing.</List.Item>
            <List.Item>Users can use DALLE to to suggest illustrations for their writing and thus use those images directly or as inspiration for their own illustrations.</List.Item>
            <List.Item>Disclaimers:
              <List withPadding listStyleType="disc">
              <List.Item>Generative-AI models generate content based on the prompt given and the data they have been trained upon.</List.Item>
              <List.Item>It may occasionally produce, wrong, harmful or biased content.</List.Item>
              <List.Item>All creators must ensure they use these tools responsibly to ensure fair and safe content is produced.</List.Item>
              </List>
            </List.Item>
          </List>
        </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <div>
          <Navigation {...states}/>
      </div>
      <div>
          <Layout {...states[activePage-1]} key={activePage}/>
      </div>
      <Center>
              <ActionIcon variant="transparent" disabled={true} className="plusButton">
              </ActionIcon>
              <Pagination value={activePage} onChange={setPage} total={numPages} />
              <ActionIcon variant="subtle" color="blue" onClick={addPageHandler} className="plusButton">
                  <Plus />
              </ActionIcon>
      </Center>
    </div>

  );
}

export default App;
