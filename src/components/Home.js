import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const axios = require('axios');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4040/all').then(res => {
      console.log(this.state.flowers);
      this.setState({ flowers: res.data })


    })
  }

  render() {
    return (
      <>
        <h1>API Flowers</h1>
        <Row xs={1} md={2} className="g-4">
          {
            this.state.flowers.map(val => {
              return (
                <Col>
                  <Card>
                    <Card.Img variant="top" src={val.photo} />
                    <Card.Body>
                      <Card.Title>{val.name}</Card.Title>
                      <Card.Text>
                        {val.instructions}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )

            })
          }
        </Row>

      </>
    )
  }
}

export default Home;
