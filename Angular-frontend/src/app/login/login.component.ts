import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import {User} from '../models/user';
import {Hotel} from '../models/hotel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User[];
  username = '';
  password = '';
  loading = true;
  error: any;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {}

  login(): void{
    this.apollo.query<any>({
      query: gql`
        query ($username: String!, $password: String!){
          getUserByUsernameAndPassword(username:$username, password:$password){
            user_id,
            username,
            password
          }
        }`,
      variables: {
        username: this.username,
        password: this.password
      }
    })
      .subscribe(({data, loading}) => {
          this.user = data.getUserByUsernameAndPassword;
          console.log('User: ', this.user);
          this.loading = loading;
          localStorage.setItem('isValidUser', 'true');
          this.router.navigate(['/hotels']);
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
