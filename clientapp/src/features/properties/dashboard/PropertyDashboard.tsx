import React from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PropertyList from "./PropertyList";


const PropertyDashboard: React.FC = () => {

  return (
    <Grid>
      <Grid.Column width={10}>
        <PropertyList/>
      </Grid.Column>
      <Grid.Column width={6}>
       <h1>Filters Later</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PropertyDashboard);
