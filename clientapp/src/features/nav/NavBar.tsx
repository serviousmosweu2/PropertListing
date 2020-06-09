import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps{
  openCreateForm: () => void;
}
const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
            Property Listing
        </Menu.Item>
        <Menu.Item name="Properties" />
        <Menu.Item>
            <Button onClick={openCreateForm}  positive content='Add New Property'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
