import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class UpdateFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favNmae: this.props.updateObj.name,
            favInstructions: this.props.updateObj.instructions,
            favPhoto: this.props.updateObj.photo,
            id: this.props.updateObj._id
        }
    }

    handleUpdateModel = (e) => this.setState({ favNmae: e.target.value })
    handleFavInstructions = (e) => this.setState({ favInstructions: e.target.value })
    handleFavPhoto = (e) => this.setState({ favPhoto: e.target.value })

    submitUpdateModel = (e) => {
        e.preventDefult();
        const id = this.state.id
        const body = {
            name: this.state.favNmae,
            instructions: this.state.favInstructions,
            photo: this.state.favPhoto,

        }
        axios.put(`http://localhost:4040/fav/${id}`).then(res => {
            const update = this.props.fav.map(val => {
                if (val._id === id) {
                    val.name = res.data.favNmae;
                    val.instructions = res.data.favInstructions;
                    val.photo = res.data.favPhoto

                    return val
                }
                return val
            })
            this.props.updateFav(update);
            this.props.handleUpdateModel({})
        }).catch(error => { alert(error) })
    }


    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleUpdateModel}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => { this.submitUpdateModel(e) }}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>name</Form.Label>
                                <Form.Control onChange={(e) => this.handleFavName(e)} value={this.state.favNmae} type="text" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>instructions</Form.Label>
                                <Form.Control onChange={(e) => this.handleFavInstructions(e)} value={this.state.favInstructions} type="text" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>photo</Form.Label>
                                <Form.Control onChange={(e) => this.handleFavPhoto(e)} value={this.state.favPhoto} type="text" placeholder="Enter email" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleUpdateModel}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateFav
