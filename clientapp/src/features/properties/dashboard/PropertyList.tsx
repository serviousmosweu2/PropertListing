import React, { useContext } from "react";
import { Item, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LandPropertyStore from "../../../app/stores/landPropertyStore";
import { PropertyListItem } from "./PropertyListItem";

const PropertyList: React.FC = () => {

  const landPropertyStore = useContext(LandPropertyStore);
  const {landProperties ,submitting} = landPropertyStore;
  
  return (
      <Item.Group divided>
        {landProperties.map((landProperty) => (
          <PropertyListItem key={landProperty.id} landProperty={landProperty}/>
        ))}
      </Item.Group>
  );
};

export default observer(PropertyList);
