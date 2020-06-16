import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {

  
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} exact to='/'>
            Property Listing
        </Menu.Item>
        <Menu.Item name="properties" as={NavLink} to='/properties' />
        <Menu.Item>
            <Button as={NavLink} to='/createLandProperty' positive content='Add New Property'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
