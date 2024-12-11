import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';  // Import jsPDF

@Component({
  selector: 'app-appointment-success',
  templateUrl: './appointment-success.component.html',
  styleUrls: ['./appointment-success.component.css']
})
export class AppointmentSuccessComponent implements OnInit {
  appointment = {
    id: '', // Unique Appointment ID
    source: '',
    destination: '',
    travelDate: '',
    travelTime: '',
    fare: '',
    distance: '',
    uniqueId: '' // New field to store the unique ID
  };

  user = {
    username: '',
    email: '',
    mobile: ''
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.appointment.uniqueId = params['uniqueId'] || ''; // Retrieve the unique ID from query params
      this.appointment.source = params['source'] || '';
      this.appointment.destination = params['destination'] || '';
      this.appointment.fare = params['fare'] || '';
      this.appointment.distance = params['distance'] || '';
      this.appointment.travelDate = params['travelDate'] || '';
      this.appointment.travelTime = params['travelTime'] || '';
    });

    // Get user data from localStorage
    this.user.username = localStorage.getItem('user_name') || 'N/A';
    this.user.email = localStorage.getItem('user_email') || 'N/A';
    this.user.mobile = localStorage.getItem('user_mobile') || 'N/A';
  }

  goHome() {
    this.router.navigate(['/dash']);
  }

  printPDF() {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Appointment Confirmation', 10, 10);
  
    // Define columns for the table
    const columns = ['Detail', 'Information'];
  
    // Rows with appointment details
    const rows = [
      ['Appointment ID', this.appointment.id],
      ['Name', this.user.username],
      ['Email', this.user.email],
      ['Mobile', this.user.mobile],
      ['Source', this.appointment.source],
      ['Destination', this.appointment.destination],
      ['Travel Date', this.appointment.travelDate],
      ['Travel Time', this.appointment.travelTime],
      ['Fare', this.appointment.fare],
      ['Distance', this.appointment.distance],
      ['Unique ID', this.appointment.uniqueId] // Display the unique ID
    ];
  
    // Table settings
    const tableStartY = 30; // Start the table lower down for better space
    const rowHeight = 10;    // Set row height
    const columnWidths = [50, 140]; // Width of the two columns (adjusted)
  
    // Draw the table headers
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    columns.forEach((col, i) => {
      doc.text(col, 10 + i * columnWidths[i], tableStartY); // Draw headers
    });
  
    // Draw the table rows
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    rows.forEach((row, index) => {
      const detailX = 10; // Position of the 'Detail' column
      const infoX = 10 + columnWidths[0]; // Position of the 'Information' column
      const y = tableStartY + (index + 1) * rowHeight; // Y position for the row
  
      // Draw 'Detail' column text (left-aligned)
      doc.text(row[0], detailX, y);
  
      // Draw 'Information' column text (left-aligned for text and right-aligned for numbers)
      const text = row[1];
      const isNumeric = !isNaN(parseFloat(text)); // Check if the content is numeric
  
      if (isNumeric) {
        // Right-align numeric values in the 'Information' column
        doc.text(text, infoX + (columnWidths[1] - doc.getTextWidth(text)), y);
      } else {
        // Left-align text values in the 'Information' column
        doc.text(text, infoX, y);
      }
    });
  
    // Draw the borders around the table and cells
    const tableHeight = rows.length * rowHeight + 10;
    doc.setLineWidth(0.1);
  
    // Draw table border
    doc.rect(10, tableStartY - 3, columnWidths[0] + columnWidths[1], tableHeight);
  
    // Draw individual cell borders
    rows.forEach((_, index) => {
      const y = tableStartY + (index + 1) * rowHeight;
      doc.rect(10, y - rowHeight, columnWidths[0], rowHeight); // Left cell border
      doc.rect(10 + columnWidths[0], y - rowHeight, columnWidths[1], rowHeight); // Right cell border
    });
  
    // Save the PDF with a dynamic name based on appointment ID
    doc.save(`appointment-${this.appointment.id}.pdf`);
  }
  
}
