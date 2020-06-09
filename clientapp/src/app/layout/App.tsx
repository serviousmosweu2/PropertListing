import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IProperty } from "../models/property";
import NavBar from "../../features/nav/NavBar";
import { PropertyDashboard } from "../../features/properties/dashboard/PropertyDashboard";

const baseURL = "";
const App = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
    null
  );
  const [editModeProperty, setEdtModeProperty]=useState(false);

  const handleSelectPropoerty = (id: string) => {
    setSelectedProperty(properties.filter((a) => a.propertyId === id)[0]);
  };

  const  handleOpenCreateForm = ()=>{
    setSelectedProperty(null);
    setEdtModeProperty(true);
  };

  useEffect(() => {
    axios
      .get<IProperty[]>("http://localhost:5000/api/Properties/")
      .then((response) => {
        setProperties(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: 60 }}>
        <PropertyDashboard
          properties={properties}
          selectProperty={handleSelectPropoerty}
          selectedProperty={selectedProperty}
          editModeProperty={editModeProperty}
          setEdtModeProperty={setEdtModeProperty}
          setSelectedProperty={setSelectedProperty}
        />
      </Container>
    </Fragment>
  );
};

export default App;
