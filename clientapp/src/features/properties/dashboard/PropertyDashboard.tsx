import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";
import { PropertyList } from "./PropertyList";
import { PropertyDetails } from "../details/PropertyDetails";
import { PropertyForm } from "../form/PropertyForm";

interface IProps {
  properties: IProperty[];
  selectProperty: (id: string) => void;
  selectedProperty: IProperty | null;
  editModeProperty: boolean;
  setEdtModeProperty: (editModeProperty: boolean) => void;
  setSelectedProperty: (property: IProperty | null) => void;
  createProperty: (property: IProperty)=>void;
  editProperty: (property: IProperty)=>void;
  deleteProperty:(id: string)=>void;
}

export const PropertyDashboard: React.FC<IProps> = ({
  properties,
  selectProperty,
  selectedProperty,
  editModeProperty,
  setEdtModeProperty,
  setSelectedProperty,
  createProperty,
  editProperty,
  deleteProperty
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PropertyList 
        properties={properties} selectProperty={selectProperty} 
        deleteProperty={deleteProperty}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedProperty && !editModeProperty && (
          <PropertyDetails
            property={selectedProperty}
            setEdtModeProperty={setEdtModeProperty}
            setSelectedProperty={setSelectedProperty}
          />
        )}
        {editModeProperty && (
          <PropertyForm
          key={selectedProperty && selectedProperty.propertyId || 0} 
            setEdtModeProperty={setEdtModeProperty}
            property={selectedProperty!}
            createProperty={createProperty}
            editProperty={editProperty}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
