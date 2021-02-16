import Block from './Block';
import { Container, Row, Col } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';

const Grid = () => {
    const blocks = [];
    for (let k = 0; k < 20; k++) {
        blocks.push(
            <Col key={idGenerator()} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mt-3">
                <Block />
            </Col>
        );
    };


    return (
        <div>

            <Container>
                <Row className="justify-content-center mt-5">
                    <h1>Grid Component</h1>
                </Row>
                <Row className="justify-content-center mt-5">
                    {blocks}
                </Row>
            </Container>
        </div>
    );
};

export default Grid;