import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";

interface IProps {
  property: IProperty;
  setEdtModeProperty: (editMode: boolean) => void;
  setSelectedProperty: (property: IProperty | null) => void;
}
export const PropertyDetails: React.FC<IProps> = ({
  property,
  setEdtModeProperty,
  setSelectedProperty,
}) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Rent Value : {property.rentValue}</Card.Header>
        <Card.Meta>
          <span className="date">Date Added</span>
        </Card.Meta>
        <Card.Description>Propert Descriptions</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={3}>
          <Button
            onClick={() => setEdtModeProperty(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedProperty(null)}
            basic
            color="grey"
            content="Cancel"
          />
          <Button basic color="red" content="Delete" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
