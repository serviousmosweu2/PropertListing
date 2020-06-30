import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { ILandProperty } from "../../../app/models/property";

export const PropertyListItem: React.FC<{ landProperty: ILandProperty }> = ({
  landProperty,
}) => {


  return (
    <Segment.Group>
      <Segment clearing>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as="a">{landProperty.title}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>
        <Icon name="marker" /> {landProperty.streatAddress1},
        {landProperty.suburb}, {landProperty.city}
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/properties/${landProperty.id}`}
          floated="right"
          color="blue"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};
