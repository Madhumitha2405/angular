export interface User{
    name:string;
    employeeId:string;
    email:string;
    role:string;
    managerId:string;
    status:'Active' | 'Inactive';
}