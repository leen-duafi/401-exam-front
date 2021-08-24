import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: []
    }
  }
  componentDidMount = () => {
    axios.get(`http://localhost:4040/fav?q${this.props.auth0.user.email}`).then(res =>
      this.setState({ fav: res.data })
    ).catch(error => { alert(error) })
  }

  deleteFav = (favId) => {
    // const favId = req.
    axios.delete(`http://localhost:4040/fav/${favId}}`).then(res => {
      if (res.data.ok === 1) {
        const bye = this.state.fav.filter(val =>
          val._id !== favId
        )
        this.setState({ fav: bye })
      }
    })


  }



  render() {

    return (
      <>
        <h1>My Favorite Flowers</h1>
        <Row xs={1} md={2} className="g-4">
          {
            this.state.fav.map(val => {
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
                    <Button variant="secondary" onClick={() => { this.deleteFav(val._id) }}>delete fav</Button>
                    <Button variant="secondary">edit fav</Button>
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

export default withAuth0(FavFlowers);
