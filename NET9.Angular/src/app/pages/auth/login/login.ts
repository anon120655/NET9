import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';

  constructor(private router: Router) { }

  onSubmit() {
    // TODO: เรียก service ตรวจสอบ credentials
    // ถ้าสำเร็จ ให้ navigate ไปหน้าแรก
    if (this.username && this.password) {
      // ตัวอย่าง – ยังไม่เชื่อม backend
      this.router.navigate(['/']);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
}
