import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Verse} from "../model/verse";
import {BibleVersion} from "../model/bible-version";
import {Book} from "../model/book";

@Injectable({providedIn: 'root'})
export class BibleService {

    private readonly baseUrl: string = 'http://localhost:8080/bible-be/';

    constructor(private http: HttpClient) {
    }

    getAllVersions(): Observable<BibleVersion[]> {
        const url: string = this.baseUrl + 'versions';
        return this.http.get<BibleVersion[]>(url);
    }

    getAllBooks(): Observable<Book[]> {
        const url: string = this.baseUrl + 'books';
        return this.http.get<Book[]>(url);
    }

    getBookChapters(versionCode: string, bookId: number): Observable<number[]> {
        const url: string = this.baseUrl + versionCode + '/chapters/' + bookId;
        return this.http.get<number[]>(url);
    }

    getChapterVerses(versionCode: string, bookId: number, chapterNumber: number): Observable<number[]> {
        const url: string = this.baseUrl + versionCode + '/verses/' + bookId + '/' + chapterNumber;
        return this.http.get<number[]>(url);
    }

    getVerse(versionCode: string, bookId: number, chapterNumber: number, verseNumber: number): Observable<Verse> {
        const url: string = this.baseUrl + 'verse/' + versionCode + '/' + bookId + '/' + chapterNumber + '/' + verseNumber;
        return this.http.get<Verse>(url);
    }

}
