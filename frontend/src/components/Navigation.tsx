import { Navbar, Nav, Container,Button,Offcanvas } from 'react-bootstrap';
import axios from "axios";
import {Document,Paragraph,Packer,ImageRun } from 'docx';
import { saveAs } from "file-saver";


interface stateHandler{
  pageNumber:number,
  textPrompt:string,
  typedText:string,
  selectedImage:number,
  imageList: string[],
  dataHandler:Function
}


function Navigation(childData:any){
    // console.log("Recieved in NavBar",childData)

    const resetChatGPT = async () =>{
        await axios.post('http://127.0.0.1:5000/api/reset_chatgpt', {chatGPT:'reset'})
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    
    const exportBook = async() => {

      const paragraphArray: Paragraph[] = [];
      
      console.log(childData)
      for (let i in childData) {
        paragraphArray.push(new Paragraph(childData[i].typedText));
  
        if(childData[i].selectedImage>0){
          const blob = await fetch(
            "https://cors-anywhere.herokuapp.com/"+childData[i].imageList[childData[i].selectedImage-1],{
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
            </Container>
        </Navbar>
        </>

    );
}
export default Navigation;