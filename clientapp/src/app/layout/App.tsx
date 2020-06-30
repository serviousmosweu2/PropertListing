import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard'
import LandPropertyStore from "../stores/landPropertyStore";
import LoadingComponent from "./LoadingComponent";
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch} from "react-router-dom";
import { homepage } from "../../features/home/homepage";
import PropertyForm from "../../features/properties/form/PropertyForm";
import PropertyDetails from "../../features/properties/details/PropertyDetails";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify';
 
const App: React.FC<RouteComponentProps> = ({location}) => {
  const landPropertyStore = useContext(LandPropertyStore);

  useEffect(() => {
    landPropertyStore.loadLandProperties();
  }, [landPropertyStore]);

  if(landPropertyStore.loadingInitial) return <LoadingComponent content='Loading Properties'/>
  return (
    <Fragment>
      <ToastContainer position='top-center'/>
      <NavBar/> 
      <Container style={{ marginTop: 60 }}>
        <Switch>
        <Route exact path='/' component={homepage}/>
        <Route exact path='/properties' component={PropertyDashboard}/>
        <Route path='/properties/:id' component={PropertyDetails}/>
        <Route key={location.key} path={['/createLandProperty', '/editLandProperty/:id']} component={PropertyForm}/>
        <Route component={NotFound}/>
        </Switch>
       
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
