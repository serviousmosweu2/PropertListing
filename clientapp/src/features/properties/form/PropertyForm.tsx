import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";

interface IProps {
  setEdtModeProperty: (editMode: boolean) => void;
  property: IProperty;
}

export const PropertyForm: React.FC<IProps> = ({
  setEdtModeProperty,
  property: initializeFormState,
}) => {
  const initializeForm = () => {
    if (initializeFormState) {
        return initializeFormState;
    } else {
      return {
        propertyId:'',
        isAvailable: '',
        marketValue: '',
        rentValue: '',
        landlordId:'',
        propertyTypeId:'',
        locationId:''

      };
    }
  };

  const [property, setProperty]= useState<IProperty>(initializeForm)

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="RentValue" />
        <Form.Input placeholder="Available" />
        <Form.Input placeholder="MarketValue" />
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
