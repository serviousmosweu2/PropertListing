import React, { useState, ChangeEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";
import {v4 as uuid} from "uuid";

interface IProps {
  setEdtModeProperty: (editMode: boolean) => void;
  property: IProperty;
  createProperty: (property: IProperty) => void;
  editProperty: (property: IProperty) => void;
  
}

export const PropertyForm: React.FC<IProps> = ({
  setEdtModeProperty,
  property: initializeFormState,
  createProperty,
  editProperty
}) => {
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        propertyId: "",
        isAvailable: "",
        marketValue: "",
        rentValue: "",
        landlordId: "",
        propertyTypeId: "",
        locationId: "",
      };
    }
  };

  const [property, setProperty] = useState<IProperty>(initializeForm);

  const handleSubmit = () => {
    if (property.propertyId.length === 0) {
      let newProperty = {
        ...property,
      };
      createProperty(newProperty);
    } else {
      editProperty(property);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProperty({ ...property, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="rentValue"
          placeholder="RentValue"
          value={property.rentValue}
        />
        <Form.Input
          onChange={handleInputChange}
          name="isAvailable"
          placeholder="Available"
          value={property.isAvailable}
        />
        <Form.Input
          onChange={handleInputChange}
          name="marketValue"
          placeholder="MarketValue"
          value={property.marketValue}
        />
        <Button floated="right" positive type="submit" content="Save" />
        <Button
          onClick={() => setEdtModeProperty(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
