import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  user!: User;
  errMsg = "";
  userId: string | null = null;
  allowEdit = false;
  id:string|null = null;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        console.log(this.userId, "  ",this.id)
        if (this.userId == this.id) {
          this.allowEdit = true;
        }
        if (this.id) {
          this.userService.findOne(this.id).subscribe(
            (data) => {
              this.user = data;
            },
            (err: HttpErrorResponse) => {
              this.errMsg = err.message;
            }
          )
        }
      }
    )


  }

}
