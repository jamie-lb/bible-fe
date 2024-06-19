import {Component, OnInit} from '@angular/core';
import {BibleService} from "../services/bible.service";
import {Verse} from "../model/verse";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BibleVersion} from "../model/bible-version";
import {Book} from "../model/book";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NgIf, FormsModule, NgForOf],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    versions: BibleVersion[] = [];
    books: Book[] = [];
    bookChapters: number[] = [];
    chapterVerses: number[] = [];
    selectedVersionCode: string | undefined;
    selectedBookId: string | undefined;
    selectedChapterNumber: string | undefined;
    selectedVerseNumber: string | undefined;
    verse: Verse | undefined;
    isBusy: boolean = false;
    errorMessage: string | undefined;

    constructor(private service: BibleService) {
    }

    ngOnInit(): void {
        this.isBusy = true;
        this.service.getAllVersions().subscribe({
            next: (allVersions: BibleVersion[]) => {
                this.versions = allVersions;
                this.selectedVersionCode = this.versions[0].versionCode;
                this.service.getAllBooks().subscribe({
                    next: (allBooks: Book[]) => {
                        this.books = allBooks;
                        this.selectedBookId = (this.books[0].id || 0).toString();
                        this.loadChapterNumbers();
                        this.isBusy = false;
                    }, error: (error) => this.handleError(error)
                });
            }, error: (error) => this.handleError(error)
        });
    }

    selectedVersionChanged(): void {
        this.loadChapterNumbers();
    }

    private loadChapterNumbers(): void {
        this.bookChapters = [];
        this.chapterVerses = [];
        this.verse = undefined;
        this.selectedChapterNumber = undefined;
        this.selectedVerseNumber = undefined;
        if (this.isVersionAndBookSelected()) {
            this.isBusy = true;
            const versionCode: string = this.selectedVersionCode || '';
            const bookId: number = +(this.selectedBookId || '0');
            this.service.getBookChapters(versionCode, bookId).subscribe({
                next: (chapters: number[]) => {
                    this.bookChapters = chapters;
                    this.selectedChapterNumber = chapters[0].toString();
                    this.loadChapterVerses();
                    this.isBusy = false;
                }, error: (error) => this.handleError(error)
            });
        }
    }

    private isVersionAndBookSelected(): boolean {
        return (this.selectedVersionCode || '').trim().length > 0 && (+(this.selectedBookId || '0')) > 0;
    }

    selectedBookChanged(): void {
        this.loadChapterNumbers();
    }

    chapterNumberChanged(): void {
        this.loadChapterVerses();
    }

    private loadChapterVerses(): void {
        this.chapterVerses = [];
        this.verse = undefined;
        this.selectedVerseNumber = undefined;
        if (this.isVersionAndBookSelected() && (+(this.selectedChapterNumber || '0')) > 0) {
            this.isBusy = true;
            const versionCode: string = this.selectedVersionCode || '';
            const bookId: number = +(this.selectedBookId || '0');
            const chapterNumber: number = +(this.selectedChapterNumber || '0');
            this.service.getChapterVerses(versionCode, bookId, chapterNumber).subscribe({
                next: (verseNumbers: number[]) => {
                    this.chapterVerses = verseNumbers;
                    this.selectedVerseNumber = verseNumbers[0].toString();
                    this.loadSelectedVerse();
                    this.isBusy = false;
                }, error: (error) => this.handleError(error)
            });
        }
    }

    verseNumberChanged(): void {
        this.loadSelectedVerse();
    }

    loadSelectedVerse(): void {
        this.errorMessage = undefined;
        this.verse = undefined;
        if (this.isVersionAndBookSelected() && (+(this.selectedChapterNumber || '0')) > 0 && (+(this.selectedVerseNumber || '0')) > 0) {
            this.isBusy = true;
            const versionCode: string = this.selectedVersionCode || '';
            const bookId: number = +(this.selectedBookId || '0');
            const chapterNumber: number = +(this.selectedChapterNumber || '0');
            const verseNumber: number = +(this.selectedVerseNumber || '0');
            this.service.getVerse(versionCode, bookId, chapterNumber, verseNumber).subscribe({
                next: (verse: Verse) => {
                    this.verse = verse;
                    this.isBusy = false;
                }, error: (error) => this.handleError(error)
            });
        }
    }

    private handleError(error: any): void {
        this.isBusy = false;
        this.errorMessage = error.error;
    }

}
