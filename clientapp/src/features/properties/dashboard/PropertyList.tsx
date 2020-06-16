import React, { useContext } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LandPropertyStore from "../../../app/stores/landPropertyStore";
import { Link } from "react-router-dom";

const PropertyList: React.FC = () => {

  const landPropertyStore = useContext(LandPropertyStore);
  const {landProperties , deleteLandProperty,submitting,target} = landPropertyStore;
  
  return (
    <Segment clearing>
      <Item.Group divided>
        {landProperties.map((landProperty) => (
          <Item key={landProperty.id}>
            <Item.Content>
              <Item.Header as="a">{landProperty.title}</Item.Header>
              <Item.Meta>
                R {landProperty.streatAddress1} 2 Bedroom Apartment in Halfway
              </Item.Meta>
              <Item.Description>
                <div>IsAvailable {landProperty.suburb}</div>
                <div>2 bed</div>
                <div>1 Shower</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link} to={`/properties/${landProperty.id}`}
                  floated="right"
                  color="blue"
                  content="View"
                />
                <Button
                  name={landProperty.id}
                  loading={target === landProperty.id && submitting}
                  onClick={(e) => deleteLandProperty(e,landProperty.id)}
                  floated="right"
                  color="red"
                  content="Delete"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(PropertyList);
