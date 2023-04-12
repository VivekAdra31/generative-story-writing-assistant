import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
// Highlight Current Tab
function Navigation(){
    // const [current,setCurrent] = useState('')
    return (
        <>
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark' >
            <Container fluid>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='reponsive-navbar-nav'>
                    <Navbar.Brand>Story Writer?</Navbar.Brand>
                    {/* <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/add'>Add Expense</Nav.Link>
                        <Nav.Link href='/view'>View Expenses</Nav.Link>
                        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>

    );
}
export default Navigation;