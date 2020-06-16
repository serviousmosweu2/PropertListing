import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard'
import LandPropertyStore from "../stores/landPropertyStore";
import LoadingComponent from "./LoadingComponent";
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps} from "react-router-dom";
import { homepage } from "../../features/home/homepage";
import PropertyForm from "../../features/properties/form/PropertyForm";
import PropertyDetails from "../../features/properties/details/PropertyDetails";

const App: React.FC<RouteComponentProps> = ({location}) => {
  const landPropertyStore = useContext(LandPropertyStore);

  useEffect(() => {
    landPropertyStore.loadLandProperties();
  }, [landPropertyStore]);

  if(landPropertyStore.loadingInitial) return <LoadingComponent content='Loading Properties'/>
  return (
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: 60 }}>
        <Route exact path='/' component={homepage}/>
        <Route exact path='/properties' component={PropertyDashboard}/>
        <Route path='/properties/:id' component={PropertyDetails}/>
        <Route key={location.key} path={['/createLandProperty', '/editLandProperty/:id']} component={PropertyForm}/>
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
