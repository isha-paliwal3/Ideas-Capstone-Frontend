import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vaccine-tracker';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 10) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      this.authService.getLoggedInUser().subscribe(response => {
        this.authService.doctorProfile.doctor = response.data;
        console.log(response.data)
        this.authService.doctorProfile.jwt = jwt;
        this.authService.isDoctorLoggedIn = true;
        this.router.navigateByUrl("/landingPage");
      },
        catchError(error => {
          return throwError(error);
        })
      );
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
