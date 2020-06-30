import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ILandProperty } from "../../../app/models/property";
import {v4 as uuid} from "uuid";
import LandPropertyStore from '../../../app/stores/landPropertyStore';
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const PropertyForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

  const landPropertyStore = useContext(LandPropertyStore);
  const {
    createLandProperty, editLandProperty, submitting, cancelFormOpen, 
    landProperty: initializeFormState, loadLandProperty, clearLandProperty} = landPropertyStore;

  const [landProperty, setLandProperty] = useState<ILandProperty>({
      id: '',
      title: '',
      streatAddress1: '',
      suburb: '',
      city: ''
  });
  
  useEffect(() => {
    if(match.params.id || landProperty.id.length === 0){
      loadLandProperty(match.params.id).then(()=> initializeFormState && setLandProperty(initializeFormState))
    }
    return () => {
      clearLandProperty();
    }
  },[clearLandProperty,loadLandProperty,setLandProperty,initializeFormState, match.params.id,landProperty.id.length]);

  const handleSubmit = () => {
    if (landProperty.id.length === 0) {
      let newProperty = {
        ...landProperty,
        id: uuid()
      };
      createLandProperty(newProperty).then(() => history.push(`/properties/${newProperty.id}`));
    } else {
      editLandProperty(landProperty).then(()=> history.push(`/properties/${landProperty.id}`));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLandProperty({ ...landProperty, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={landProperty.title}
        />
        <Form.Input
          onChange={handleInputChange}
          name="streatAddress1"
          placeholder="StreatAddress1"
          value={landProperty.streatAddress1}
        />
        <Form.Input
          onChange={handleInputChange}
          name="suburb"
          placeholder="Suburb"
          value={landProperty.suburb}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={landProperty.city}
        />
        <Button loading={submitting} floated="right" positive type="submit" content="Save" />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(PropertyForm);