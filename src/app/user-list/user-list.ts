import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../models/user.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCreateDialog } from '../user-create-dialog/user-create-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WfhReqDialog } from '../wfh-req-dialog/wfh-req-dialog';

@Component({   
  selector: 'app-user-list',
  imports: [
    CommonModule,
    WfhReqDialog,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit,AfterViewInit{

  constructor(private dialog:MatDialog,
    private snackBar: MatSnackBar
  ){}

  displayedColumns: string[] = ['select', 'name', 'employeeId', 'email', 'role', 'managerId', 'status','actions'];

  //  Initialize DataSource with your SAMPLE_DATA
  dataSource = new MatTableDataSource<User>(SAMPLE_DATA);
  selection = new Set<User>();

//  Use a Setter for the Paginator   
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  //  Use a Setter for the Sort
  @ViewChild(MatSort) sort!: MatSort;

  openCreateDialog() {
  console.log('Opening....');
  const dialogref = this.dialog.open(UserCreateDialog, {
    width: '1100px',
    panelClass: 'custom-dialog-container',
  });

  dialogref.afterClosed().subscribe(result => {
    if (result) {
      console.log('New User Data Received', result);
      
      //  Get the current list of users
      const currentData = this.dataSource.data;
      const newUser ={...result,name:result.fullName};

      //  Add the new user (result) to the beginning of the array
      // This ensures the new user appears at the very top of your table
      this.dataSource.data = [newUser, ...currentData];
    }
  });
}
  ngOnInit() {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchStr = (data.name + data.email + data.employeeId).toLowerCase();
      return searchStr.includes(filter.toLowerCase());
    }
  }
  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected(){
    return this.selection.size === this.dataSource.data.length;
  }
  masterToggle(){
    if(this.isAllSelected()){
      this.selection.clear();
    }else{
      this.dataSource.data.forEach(row => this.selection.add(row));
    }
  }
  deleteUser(user:User){
    if(confirm(`Are you sure you want to delete ${user.name}?`)){
      this.dataSource.data = this.dataSource.data.filter(u => u !== user);
    }
    this.snackBar.open('User Deleted Successfully!', 'OK', { duration: 3000 });
  }
  openWFHDialog() {
  const dialogref = this.dialog.open(WfhReqDialog, {
    width: '800px',
    panelClass: 'custom-dialog-container'
  });

  dialogref.afterClosed().subscribe(result => {
    if (result) {
      console.log('Main List received WFH Data:', result);
      // Here you could add logic to refresh a "Request Status" table
    }
  });
}
} 
const SAMPLE_DATA:User[]=[
  { name: 'ARUN KUMAR ', employeeId: 'M1186', email: 'arunkumar@focusrtech.com', role: 'Role manager', managerId: 'M1003', status: 'Active' },
  { name: 'Aathiya Arunachalam', employeeId: 'M1211115', email: 'aathiya.arunachalam@focusrtech.com', role: 'Team member', managerId: 'F1277', status: 'Inactive' },
  { name: 'Abdul Basith M', employeeId: 'M1206', email: 'abdulbasith.m@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'Abdul Hafeez', employeeId: 'M1263', email: 'hafeez.a@xymz.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'Abhilash S', employeeId: 'M1172', email: 'abhilash.s@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Aishwarya', employeeId: 'F1477', email: 'aishwarya.anbu@focusrtech.com', role: 'Role sales executive', managerId: 'DM001', status: 'Active' },
  { name: 'Ajay', employeeId: 'AJ1317', email: 'ajay123@gmail.com', role: 'Team member', managerId: 'M125', status: 'Active' },
  { name: 'Ajith Kumar', employeeId: 'M1119', email: 'ajithkumar.mani@focusrtech.com', role: 'Role manager', managerId: 'M7555', status: 'Active' },
  { name: 'Akajith', employeeId: 'AK47', email: 'akajith@gmail.com', role: 'Team member', managerId: 'M9876', status: 'Active' },
  { name: 'Akshy', employeeId: 'M1430', email: 'Akshy@gmail.com', role: 'Team member', managerId: 'F1354', status: 'Active' },
  { name: 'Amandeep Singh', employeeId: 'M1272', email: 'Amandeep.S@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'Amit Kumar S', employeeId: 'M1305', email: 'amit.s@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'Anandbabu V', employeeId: 'M1196', email: 'anandbabu.v@gmail.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Antara M', employeeId: 'F1281', email: 'antara@gmail.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'Antony Jerry Fedson A', employeeId: 'M1276', email: 'antony.a@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Anusha D', employeeId: 'F1282', email: 'anusha@gmail.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'Arumugam', employeeId: 'F1128', email: 'arumugam.prakasam@focusrtech.com', role: 'Team member', managerId: 'M7555', status: 'Active' },
  { name: 'Arun G', employeeId: 'M1151', email: 'arun.g@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Arun Varma A P', employeeId: 'C351', email: 'arunvarmaap.sundran@focusrtech.com', role: 'Team member', managerId: 'F1354', status: 'Active' },
  { name: 'Arunkumar B', employeeId: 'M1287', email: 'balaarun.b@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Arunkumar Pandiyan', employeeId: 'M1289', email: 'pandianarun.p@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Arya Saroja', employeeId: 'F1252', email: 'arya.s@xyz.com', role: 'Team member', managerId: 'M1002', status: 'Inactive' },
  { name: 'Ashok Kumar G', employeeId: 'M1288', email: 'ashokkumar.g@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Aswath Kumar AK', employeeId: 'M1253', email: 'aswathkumar.k@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Balajee J', employeeId: 'M1297', email: 'balajee.j@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Balaji RS', employeeId: 'M1077', email: 'balaji.rs@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Bhagavathi Laxmanan', employeeId: 'M1106', email: 'bhagavathi.l@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Bhargavi Muthukumar', employeeId: 'F1442', email: 'bhargavimuthukumar.muthukumaran@focusrtech.com', role: 'Team member', managerId: 'F1353', status: 'Active' },
  { name: 'Prevarshini', employeeId: 'F1441', email: 'Prevarshini.rajagurumurthi@focusrtech.com', role: 'Team member', managerId: 'F1354', status: 'Active' },
  { name: 'Bose Prabakaran S', employeeId: 'M1258', email: 'bose.s@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Chaithra', employeeId: 'F7587', email: 'chaithra.rajan@focusrtech.com', role: 'Team member', managerId: 'F1353', status: 'Active' },
  { name: 'Charu', employeeId: 'F1455', email: 'charu.senthil@focusrtech.com', role: 'Team member', managerId: 'M7555', status: 'Active' },
  { name: 'CrmManager', employeeId: 'CRM234', email: 'crmmanager@gmail.com', role: 'Crm Manager', managerId: 'F1354', status: 'Active' },
  { name: 'CrmRep', employeeId: 'C350', email: 'vijaymaz98@gmail.com', role: 'Crm Representative', managerId: 'F1354', status: 'Active' },
  { name: 'Deepan C', employeeId: 'M1250', email: 'Deepan.c@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Deva Rajan', employeeId: 'M7584', email: 'deva.rajan@focusrtech.com', role: 'Team member', managerId: 'F1353', status: 'Active' },
  { name: 'Dharani Dharan D', employeeId: 'M1222', email: 'dharanidharan.d@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Inactive' },
  { name: 'Dharani S', employeeId: 'F1242', email: 'dharani.s@xyz.com', role: 'Human resource', managerId: 'M1002', status: 'Active' },
  { name: 'Gowshik', employeeId: 'M1363', email: 'gowshickh09102021@gmail.com', role: 'Role manager', managerId: 'F1353', status: 'Active' },
  { name: 'Dhineshwaran Vijayarajan', employeeId: 'M1271', email: 'dhineshwaran.v@xyz.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'Giridharan', employeeId: 'F1623', email: 'giridharan.saminathan@xyz.com', role: 'Team member', managerId: 'CSK07', status: 'Active' },
  { name: 'Jayaprakash K', employeeId: 'M1144', email: 'jayaprakash.k@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Jayasrimenan', employeeId: 'M1431', email: 'jayasrimenan.muniyaiya@xyz.com', role: 'Team member', managerId: 'F1354', status: 'Active' },
  { name: 'Jayasundar B', employeeId: 'M1190', email: 'jayasundar.b@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Jeyandhar B', employeeId: 'M1009', email: 'jeyandhar.b@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'John', employeeId: 'C322', email: 'john.joes@focusrtech.com', role: 'Team member', managerId: 'M7555', status: 'Active' },
  { name: 'John Doe', employeeId: 'M0000', email: 'fullstackdev@gmail.com', role: 'Team member', managerId: 'CSK07', status: 'Active' },
  { name: 'KISHORE MURUGAN', employeeId: 'M1188', email: 'kishore.m@xyz.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'sai sivaK', employeeId: 'F1308', email: 'saishiva.k@focusrtech.com', role: 'Role Team member and Travel Approver', managerId: 'M1003', status: 'Active' },
  { name: 'Kalpana', employeeId: 'F3456', email: 'kalpana@focusrtech.com', role: 'Team member', managerId: 'M1001', status: 'Active' },
  { name: 'Kanishka', employeeId: 'C327', email: 'kanishka.malliraj@focusrtech.com', role: 'Team member', managerId: 'F1353', status: 'Active' },
  { name: 'Kannan', employeeId: 'F7582', email: 'kannan.abcd@focusrtech.com', role: 'Team member', managerId: 'M1001', status: 'Active' },
  { name: 'Karthi Ram', employeeId: 'M1208', email: 'kr48796@gmail.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Karthik SV', employeeId: 'M1225', email: 'karthik.v@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Kaveri Balakrishnan', employeeId: 'F1934', email: 'kaveri@gmail.com', role: 'Role manager', managerId: 'F1354', status: 'Active' },
  { name: 'Kavi', employeeId: 'C181', email: 'kaviii.suresh@focusrtech.com', role: 'Team member', managerId: 'F1353', status: 'Active' },
  { name: 'Lakshmi Sahithya Karuturi', employeeId: 'F1279', email: 'lakshmisahithya.k@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Lavanya N', employeeId: 'F1114', email: 'lavanya.n@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'Lebron', employeeId: 'R1323', email: 'ragha2369@gmail.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Leo Martin A', employeeId: 'M1306', email: 'leomartin.a@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Logesh Perumal', employeeId: 'M1507', email: 'Logeshperumal.chandrasekaran@focusrtech.com', role: 'Team member', managerId: 'M1159', status: 'Active' },
  { name: 'Lokchandar E', employeeId: 'M1294', email: 'lokchandar.e@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'MADHAN KUMAR R', employeeId: 'M1264', email: 'kumarmadhan.r@xyz.com', role: 'Team member', managerId: 'M1002', status: 'Active' },
  { name: 'Madhan Raj S', employeeId: 'M1244', email: 'madhanraj.s@xyz.com', role: 'Team member', managerId: 'M1003', status: 'Active' },
  { name: 'Vijay', employeeId: 'MAIL123', email: 'vijay.focush@gmail.com', role: 'Team member', managerId: 'F1354', status: 'Active' },
  { name: 'Nishadharan K', employeeId: 'T1211', email: 'nishadharank@gmail.com', role: 'Associate developer', managerId: 'T1211', status: 'Active' },
  { name: 'Manikandan S', employeeId: 'M1232', email: 'manikandan.s@xyz.com', role: 'Team member', managerId: 'F1053', status: 'Active' },
  { name: 'ARUN KUMAR SP murugesan Kkumar', employeeId: 'M1186', email: 'Bhuvaneswari.shanmugam@focusrtech.com', role: 'Role manager', managerId: 'M1003', status: 'Active' },

]