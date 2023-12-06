import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private service:AuthService, private dialog:MatDialog){}

  userList:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[] = ['id','userName','name','email','password','role','status','action']

  ngOnInit(): void {
      this.loadUser();
  }

  loadUser(){
    this.service.getAll().subscribe(res =>{
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updatePopup(code:any){

    // this.dialog.open(UpdatePopupComponent),{
    //   enterAnimationDuration : '1000ms',
    //   exitAnimationDuration : '500ms',
    //   width : '50%',
    //   data : {
    //     userCode:id
    //   }
    // }

    this.openDialog('1000ms','600ms',code);
  }

  openDialog(enterAnimations:any, exitAnimations:any, code:any){
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration : enterAnimations,
      exitAnimationDuration : exitAnimations,
      width : '20%',
      data : {
        userCode : code
      }
    });
    popup.afterClosed().subscribe(res =>{
      console.log(res)
      this.loadUser();
    })
  }
}
