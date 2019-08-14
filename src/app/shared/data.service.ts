import { Injectable } from "@angular/core";


@Injectable()
export class DataEntity{


     entityData: any;
   
    setEntityData(data: any){
        this.entityData =  data; 
        console.log(this.entityData);
    }
    getEntityData(){
        console.log(this.entityData);
        return this.entityData;        
    }


    

}