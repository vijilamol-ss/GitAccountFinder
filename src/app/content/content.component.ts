import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ContentComponent implements OnInit {

  username: string;
  Details;

  constructor(private httpClient: HttpClient, private toaster: ToastrService) { }
  baseUrl = 'https://api.github.com/users/';

  getItemFromLocal() {
    if (localStorage.getItem(this.username)) {
      this.Details = JSON.parse(localStorage.getItem(this.username));
      this.toaster.success('Success');
      // console.log(localStorage.getItem(this.username));
    } else {
      this.getItemFromServer();
    }

  }


  getItemFromServer() {
    this.httpClient.get(this.baseUrl + this.username).
      subscribe((res) => {
        this.Details = res;
        localStorage.setItem( this.username, JSON.stringify(res));
        this.toaster.success('Success');
      },
      () => {
        this.toaster.error('invalid username');
      } );

    }

  ngOnInit() {

  }

}
