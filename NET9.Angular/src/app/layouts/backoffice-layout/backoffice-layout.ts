import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-backoffice-layout',
  standalone: false,
  templateUrl: './backoffice-layout.html',
  styleUrl: './backoffice-layout.css'
})
export class BackofficeLayout {
  isSidebarOpen = window.innerWidth >= 1024; // Open on large screens (lg: 1024px), closed on smaller

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSidebarOpen = window.innerWidth >= 1024; // Auto-open on large screens, auto-close on smaller
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar state
  }

  closeSidebar() {
    if (window.innerWidth < 1024) { // Only close sidebar on smaller screens
      this.isSidebarOpen = false;
    }
  }

  clickSidebar() {
    this.isSidebarOpen = true;
  }
}
