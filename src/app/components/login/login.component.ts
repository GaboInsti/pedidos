import { Component } from '@angular/core';
import { User } from '../../shared/models/user.interface';
import { LoginService } from '../../shared/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  user: User = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login(this.user).subscribe({
      next: () => {
        this.router.navigate(['pedidos']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      },
    });
  }
}
