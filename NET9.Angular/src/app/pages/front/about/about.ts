import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('เกี่ยวกับฉัน');
  }
}
