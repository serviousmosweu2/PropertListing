import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    properties:[]
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/Properties/')
      .then((response) => {
        this.setState({
          properties: response.data
        })
      })
    
  }
  render()
  { 
    return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Property Listing</Header.Content>
      </Header>
      <List>
        {
            this.state.properties.map((property: any)=>(
            <List.Item 
                key={property.propertyId}> 
                {property.rentValue} 
            </List.Item>
            ))
        }
      </List>
    </div>
  );
  }
  
}

export default App;
