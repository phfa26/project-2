import React, { Component } from "react";
import axios from "axios";
import { Card, CardDeck } from "react-bootstrap";
import { Link } from "@reach/router";
import { SERVER_URL } from "../config";
import { Title, StyledCards, CardsItem, MyCard, CardImage, CardTitle, CardContent, CardText, MyButton } 
  from "../styles/StyledGivngList.js"
import "../index.css"

class GivngList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givngList: [],
      name: [],
      theme: [],
      userId: 1,// THIS IS HARDCODED - SHOULD ACCEPT PARAMS - USER ID
      date: [],
      budget: []
    };
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    const givngPost = {
      givng: {
        name: this.state.name,
        theme: this.state.theme,
        user_id: this.state.userId,
        date: this.state.date,
        budget: this.state.budget
      }
    }
    console.log(givngPost)
    axios
      .post(`${SERVER_URL}/givngs.json`, givngPost)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  removeHandler = () => {
    console.log(this.props.givng_id);
    axios
    .delete(`${SERVER_URL}/givngs/5.json`) // THIS IS HARDCODED - SHOULD ACCEPT PARAMS - GIVNG ID
  }
  
  componentDidMount() {
  
    axios
    .get(`${SERVER_URL}/givngs.json`)
    .then(res => {
      const myData = res.data;
      this.setState({
        givngList: myData
      });
    });
  }

  render() {
    const myGivngList = this.state.givngList.map((givng, index) => (
      <StyledCards key={index}>
        <CardsItem>
          <MyCard>
            <CardImage className={`${givng.theme}`}></CardImage>
            <CardContent>
              <CardTitle>{givng.name}</CardTitle>
              <CardText>{givng.date}</CardText>
              <CardText>Budget: $ {givng.budget}</CardText>
              <MyButton ><Link to={`/givngs/${givng.id}`}>acess your list</Link></MyButton>
              <form givng_id={givng.id} onSubmit={this.removeHandler}>
                <button type="submit" className="btn btn--block card__btn">Delete</button>
              </form>
            </CardContent>
          </MyCard>
        </CardsItem>
      </StyledCards>
    ));

    const { name, theme, date, budget} = this.state

    return (
      <div className="Hi" style={{textAlign: "center"}}>
        <br />
        <br />
        <Title>Your existing Givngs:</Title>
        <div style={{display: "inline-flex"}}>{myGivngList}</div>
        <CardDeck >
          <Card style={{backgroundColor: "#DFE3E8"}}>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>Add a New GIVNG:</Card.Text>
              <form onSubmit={this.submitHandler}><input type="text" placeholder="name" name="name" value={name} onChange={this.changeHandler}></input>
                <select type="text" name="theme" value={theme} onChange={this.changeHandler}>
                  <option>Christmas</option>
                  <option>Birthdays List</option> 
                  <option>Other</option> 
                </select>
                <input type="date" placeholder="date" name="date" value={date} onChange={this.changeHandler}></input>
                <input type="decimal" placeholder="budget" name="budget" value={budget} onChange={this.changeHandler}></input><br />
              <button type="submit">Submit</button></form>
            </Card.Body>
          </Card>
        </CardDeck>
        {/* <BottomContainer /> */}
      </div>
    );
  }
}

export default GivngList;