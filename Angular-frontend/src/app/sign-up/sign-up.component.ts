import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  users: User[];
  loading = true;
  error: any;
  userForms = {
    user_id: 0,
    username: '',
    password: '',
    email: ''
  };

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            getUser {
                id,
                user_id,
                username,
                password,
                email
            }
          }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          this.users = data.getUser;
          this.loading = loading;
        },
        error => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  newUser(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation ($user_id:Int!, $username:String!, $password:String!, $email:String!){
          addUser(user_id:$user_id, username:$username, password:$password, email:$email){
            user_id,
            username,
            password,
            email
          }
        }`,
      variables: {
          user_id: (this.users[this.users.length - 1].user_id + 1),
          username: this.userForms.username,
          password: this.userForms.password,
          email: this.userForms.email
      }
    })
      .subscribe(({data}) => {
      const newUsers = Object.assign([], this.users);
      newUsers.unshift(data['addUser']);
      this.users = newUsers;
    });
  }
}
