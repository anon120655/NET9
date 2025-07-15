import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('หน้าหลัก');
  }
}

