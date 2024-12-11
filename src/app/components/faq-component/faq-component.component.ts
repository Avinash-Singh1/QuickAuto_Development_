import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-component',
  templateUrl: './faq-component.component.html',
  styleUrls: ['./faq-component.component.css']
})
export class FaqComponentComponent {
  showAnswer: boolean[] = [false, false, false, false, false]; // To track which answers are visible
  userQuestion: string = ''; // For storing the user's question

  // Method to toggle the visibility of answers
  toggleAnswer(index: number) {
    this.showAnswer[index] = !this.showAnswer[index];
  }

  // Method to handle question submission
  submitQuestion(questionData: any) {
    console.log('User Question Submitted:', questionData.userQuestion);
    // Here you can implement the logic to send the question to your server
    alert('Your question has been submitted successfully!');
    this.userQuestion = ''; // Clear the input
  }
}
