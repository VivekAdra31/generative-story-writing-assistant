import { Navbar, Nav, Container,NavDropdown,Button } from 'react-bootstrap';
import axios from "axios";
// Highlight Current Tab
function Navigation(){
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
    return (
        <>
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark' >
            <Container fluid>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='reponsive-navbar-nav'>
                    <Navbar.Brand>Story Writer</Navbar.Brand>
                    {/* <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/add'>Add Expense</Nav.Link>
                        <Nav.Link href='/view'>View Expenses</Nav.Link>
                        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                    </Nav> */}
                    <Nav className="ms-auto">
                    <Nav.Item>
                    <Button variant="outline-light" onClick={resetChatGPT}>Reset Language Model</Button>
                    </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>

    );
}
export default Navigation;