import { Navbar, Nav, Container,NavDropdown,Button,Offcanvas } from 'react-bootstrap';
import axios from "axios";
import {Document,Paragraph,Packer,TextRun, SectionType} from 'docx';
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

    const exportBook = () =>{
        const doc = new Document({
                        sections: [{
                            properties: {},
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun(childData[0].typedText)
                                    ],
                                 }),
                            ],
                         },]
                    });

        // let doc = new Document();
        // doc.addSection();

        // const docx = require("docx");
    
        // Packer.toBlob(doc).then(blob => {
        //   console.log(blob);
        //   saveAs(blob, "Book.docx");
        //   console.log("Document created successfully");
        // });
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