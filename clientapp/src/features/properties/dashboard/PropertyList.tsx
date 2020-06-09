import React from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";

interface IProps {
  properties: IProperty[];
  selectProperty: (id: string) => void;
}
export const PropertyList: React.FC<IProps> = ({
  properties,
  selectProperty,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {properties.map((prop) => (
          <Item key={prop.propertyId}>
            <Item.Content>
              <Item.Header as="a">R {prop.rentValue}</Item.Header>
              <Item.Meta>
                R {prop.rentValue} 2 Bedroom Apartment in Halfway
              </Item.Meta>
              <Item.Description>
                <div>IsAvailable {prop.isAvailable}</div>
                <div>2 bed</div>
                <div>1 Shower</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectProperty(prop.propertyId)}
                  floated="right"
                  color="blue"
                  content="View"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
