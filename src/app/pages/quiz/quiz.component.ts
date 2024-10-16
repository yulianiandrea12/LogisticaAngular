import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { ApiResponse } from '../../models/api-response.model';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  frmAsistencia: FormGroup;
  eventoList: Evento[] = []; 
  userList: User[] = []; 

  constructor(private apiService: ApiService) { 
    this.frmAsistencia = new FormGroup({
      evento: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.apiService.get<Evento[]>('/evento/all').subscribe({
      next: (response: ApiResponse<Evento[]>) => {
        this.eventoList = response.body || []; // Safely assign the response body
        console.log(this.eventoList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });

    this.apiService.get<User[]>('/user/all').subscribe({
      next: (response: ApiResponse<User[]>) => {
        this.userList = response.body || []; // Safely assign the response body
        console.log(this.userList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });
  }
  
  
  
  

  asistencia() {
    // Handle form submission here
  }
}