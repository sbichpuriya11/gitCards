import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Cards extends React.Component{
  render(){
    const profile = this.props;
        return (
          <div className="col-lg-3 col-sm-12 col-md-6 px-5 py-5">
            <div className="card" style={{width: "18rem"}} >
                <img className="card-img-top" src={profile.avatar_url} alt="Card image cap"/>
                <div className="card-body">
                <p className="card-text">Name: <b>{profile.name}</b></p>
                <p className="card-text">Company:<b> {profile.company}</b></p>
                </div>
            </div>
          </div>
        ) ;  
  }
}

class Display extends React.Component{
    render(){
      return(
        <div className="h1 text-center">
            {this.props.title}
        </div>

      )
    }
}

class Form extends React.Component{
  state = {userName:''};
  handleClick = async (event)=>{
      event.preventDefault();
      const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data);
  }
  render(){
    return(
      <div className="container my-4 text-center">
      <div className="row">
        <div className="col-md-6 mb-4">
          <form className="form-inline md-form mr-auto" onSubmit={this.handleClick}>
            <input 
              className="form-control mr-sm-2" 
              type="text" placeholder="Username..." 
              value={this.state.userName} 
              onChange={(event)=>this.setState({userName:event.target.value})}
              required
            />
            <button className="btn btn-unique btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Search</button>
          </form>
        </div>
      </div>
       </div>
    );
  }
}


const CardList = (props)=>{
  return(
    <div className="row">
      {props.profiles.map(profile=> <Cards {...profile}/>)}
    </div>
  );
}



 class App extends React.Component{
   state = {
      profiles: [],
   };
   addNewProfile = (profileData)=>{
     this.setState(prevState=>({
        profiles:[...prevState.profiles,profileData],
     }));
   };
   render(){ 
        return(
          <div className="p-5">
              <Display title='The GitCards'/>
              <Form onSubmit = {this.addNewProfile}/>
              <CardList profiles={this.state.profiles}/>
          </div>
          );
        }
}


export default App;
