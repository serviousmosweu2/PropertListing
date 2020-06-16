import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import LandPropertyStore from "../../../app/stores/landPropertyStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const PropertyDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const landPropertyStore = useContext(LandPropertyStore);
  const {
    landProperty,
    loadLandProperty,
    loadingInitial,
  } = landPropertyStore;

  useEffect(() => {
    loadLandProperty(match.params.id);
  }, [loadLandProperty, match.params.id]);

  if (loadingInitial || !landProperty)
    return <LoadingComponent content="Loading Property" />;

  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Rent Value : {landProperty!.title}</Card.Header>
        <Card.Meta>
          <span className="date">Date Added</span>
        </Card.Meta>
        <Card.Description>Propert Descriptions</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={3}>
          <Button
            as={Link} to={`/editLandProperty/${landProperty.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={()=> history.push('/properties')}
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

export default observer(PropertyDetails);
