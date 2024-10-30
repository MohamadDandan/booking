
export interface user{
    name: string;
    email_address:string;
    password:string;
    status:boolean;
    role:string;
    
}
export interface login{  
    email_address:string;
    password:string;
}
export interface userUpdate{  
    id:number;
    name: string;
    email_address:string;
    password:string;
  
}
export interface adminUpdate{
    id:number;
    status:boolean;
    role:string;
    updated_at:number;
}