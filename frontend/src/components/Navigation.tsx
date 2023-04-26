import { Navbar, Nav, Container,NavDropdown,Button,Offcanvas } from 'react-bootstrap';
import axios from "axios";
import {Document,Paragraph,Packer,TextRun, SectionType,ImageRun } from 'docx';
import { saveAs } from "file-saver";
// Highlight Current Tab
interface stateHandler{
  pageNumber:number,
  textPrompt:string,
  typedText:string,
  selectedImage:number,
  imageList: string[],
  dataHandler:Function
}

const generateFromUrl = async() => {
  const blob = await fetch(
    'https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg'
  ).then((r) => r.blob());

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph('Hello World'),
          new Paragraph({
            children: [
              new ImageRun({
                data: await blob.arrayBuffer(),
                transformation: {
                  width: 100,
                  height: 100,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, 'example.docx');
    console.log('Document created successfully');
  });
}

function Navigation(childData:stateHandler[]){
  

  
    // const [current,setCurrent] = useState('')
    const resetChatGPT = async () =>{
        await axios.post('http://127.0.0.1:5000/api/reset_chatgpt', {chatGPT:'reset'})
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    

    const exportBook = async () =>{

      let paragraphArray: Paragraph[] = [];
      console.log(childData)
      for (const i in childData){
        console.log("Looping")
        // let chosen = childData[i].selectedImage;
        let chosen = 1;
        if(chosen>0){
        const imageBlob = await fetch(
          childData[i].imageList[chosen-1]
        ).then(r => r.blob());

        let paragraph = new Paragraph({
          children: [new TextRun(childData[i].typedText),
          new ImageRun({
            data: await imageBlob.arrayBuffer(),
            transformation: {
              width: 256,
              height: 256
            }
          })
        ],
        });

        paragraphArray.push(paragraph);
        console.log(paragraphArray)
      
      }
      else{
        let paragraph = new Paragraph({
          children: [new TextRun(childData[i].typedText),
        ],
        });
        paragraphArray.push(paragraph);
      }
      }
      // const imageBlob = await fetch(
      //   "https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg"
      // ).then(r => r.blob());


  
      
      // const paragraph = new Paragraph({
      //   children: [new TextRun("Lorem Ipsum Foo Bar"), new TextRun("Hello World"),
      //   new ImageRun({
      //     data: await imageBlob.arrayBuffer(),
      //     transformation: {
      //       width: 100,
      //       height: 100
      //     }
      //   })
      // ],
      // });
        // const doc = new Document({
        //                 sections: [{
        //                     properties: {},
        //                     children: [
        //                         paragraph,paragraph
        //                     ],
        //                  },
        //                 ]
        //             });

        console.log(paragraphArray)

         const doc = new Document({
                        sections: [{
                            properties: {},
                            children: paragraphArray,
                         },
                        ]
                    });
    
        Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, "Book.docx");
          console.log("Document created successfully");
        });
    }
    return (
        <>
        <Navbar collapseOnSelect fixed='top' expand='false' bg='dark' variant='dark' >
            <Container fluid>
            <Navbar.Brand>Story Writer</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Options for Story Writer
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item>
                    <Button variant="outline-dark" onClick={resetChatGPT}>Reset Language Model</Button>
                </Nav.Item>
                <br />
                <Nav.Item>
                    <Button variant="outline-dark" onClick={exportBook}>Export Book</Button>
                </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
                {/* <Navbar.Collapse id='reponsive-navbar-nav'>
                    
                    <Nav className="ms-auto">
                    <Nav.Item>
                    <Button variant="outline-light" onClick={resetChatGPT}>Reset Language Model</Button>
                    </Nav.Item>
                    <Nav.Item>
                    <Button variant="outline-light" onClick={resetChatGPT}>Reset Language Model</Button>
                    </Nav.Item>
                    </Nav>

                </Navbar.Collapse> */}
            </Container>
        </Navbar>
        </>

    );
}
export default Navigation;