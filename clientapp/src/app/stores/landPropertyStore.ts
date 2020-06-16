import {observable, action, configure, runInAction} from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { ILandProperty } from '../models/property';
import agent from '../api/agent';

configure({enforceActions:"always"});

class LandPropertyStore{
    @observable landPropertyRegistry = new Map(); // To be used later
    @observable landProperties:ILandProperty[] =[]
    @observable landProperty: ILandProperty | undefined;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable editModeLandProperty = false;
    @observable target = '';

    @action loadLandProperties = async () => {
        this.loadingInitial = true;

        try{
            const landProperties = await agent.LandProperties.list();
            runInAction(()=>{
                 landProperties.forEach((landProperty) =>{
                //this.landPropertyRegistry.set(landProperty.id, landProperty);
                this.landProperties.push(landProperty);
                });
                this.loadingInitial = false;
            });
           
        }
        catch(error){
           runInAction(()=>{
               this.loadingInitial = false; 
           });
            console.log('Getting loadLandProperties : '+ error);
        }
    };

    @action loadLandProperty = async(id: string) =>{
        let landProperty = this.getLandPropery(id);

        if(landProperty){
            this.landProperty = landProperty;
        }else{
            this.loadingInitial = true;
            try{
                landProperty = await agent.LandProperties.details(id);
                runInAction(()=>{
                    this.landProperty = landProperty;
                    this.loadingInitial = false;
                })
            }catch(error){
                runInAction(()=>{
                    this.loadingInitial = false;
                })
            }
        }

    };

    @action clearLandProperty = () =>{
        this.landProperty = undefined;
    }
    getLandPropery = (id: string) =>{
        //return this.landPropertyRegistry.get(id);
        return this.landProperty = this.landProperties.find(a => a.id === id);
    };

    @action createLandProperty = async (landProperty: ILandProperty) =>{
        this.submitting = true;
        try{
            await agent.LandProperties.create(landProperty);
            runInAction(()=>{
                this.landProperties.push(landProperty);
                //this.landPropertyRegistry.set(landProperty.id, landProperty);
                this.editModeLandProperty = false;
                this.submitting = false;
            })
            
        }catch(error){
            runInAction(()=>{
                this.submitting = false;
            })
            console.log('Error Saving loadLandProperties : '+ error);
            
        }
    };

    @action deleteLandProperty = async (event: SyntheticEvent<HTMLButtonElement>, id: string) =>{
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await agent.LandProperties.delete(id);
            runInAction(()=>{
                this.landProperty = this.landProperties.find(a => a.id !== id);
                this.submitting = false;
                this.target = '';
            })
            
        }catch(error){
            runInAction(()=>{
                this.submitting = false;
                this.target = '';
            })
            
        }
    };

    @action editLandProperty = async (landProperty : ILandProperty) => {
        this.submitting = true;
        try{
            await agent.LandProperties.update(landProperty);
            runInAction(()=>{
                this.landProperty = this.landProperties.find(a => a.id === landProperty.id, landProperty);
                //this.landPropertyRegistry.set(landProperty.id, landProperty);
                this.landProperty = landProperty;
                this.editModeLandProperty = false;
                this.submitting = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{this.submitting = false;})
            
        }
    };

    @action openEditForm = (id: string) =>{
        //this.landProperty = this.landProperties.find(a => a.id === id);
        this.landProperty = this.landPropertyRegistry.get(id);
        this.editModeLandProperty = true;
    };


    @action openCreateForm =()=>{
        this.editModeLandProperty = true;
        this.landProperty = undefined;
    };

    @action cancelSelectedActivity = () =>{
        this.landProperty = undefined;
    };

    @action cancelFormOpen = () =>{
        this.editModeLandProperty = false;
    }

    @action selectLandProperty = (id: string)=>{
        //debugger;
        //this.landProperty = this.landProperties.find(a => a.id === id);
        this.landProperty = this.landPropertyRegistry.get(id);
        this.editModeLandProperty = false;
    };
}

export default createContext(new LandPropertyStore());