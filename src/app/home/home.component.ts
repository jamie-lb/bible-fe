import {Component, OnInit} from '@angular/core';
import {BibleService} from "../services/bible.service";
import {Verse} from "../model/verse";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  verse: Verse | undefined;
  chapterNumber: number = 1;
  verseNumber: number = 26;
  isBusy: boolean = false;
  errorMessage: string | undefined;

  constructor(private service: BibleService) {
  }

  ngOnInit(): void {
    this.loadVerseDetail();
  }

  loadVerseDetail(): void {
    this.isBusy = true;
    this.errorMessage = undefined;
    this.verse = undefined;
    this.service.getVerse('ESV', 1, this.chapterNumber, this.verseNumber).subscribe({
      next: (verse: Verse) => {
        this.verse = verse;
        this.isBusy = false;
      }, error: (error) => this.handleError(error)
    });
  }

  chapterNumberChanged(): void {
    this.verseNumber = 1;
    this.loadVerseDetail();
  }

  private handleError(error: any): void {
    this.isBusy = false;
    this.errorMessage = error.error;
  }

}
