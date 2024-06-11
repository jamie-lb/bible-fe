import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Verse} from "../model/verse";

@Injectable({providedIn: 'root'})
export class BibleService {

    private readonly baseUrl: string = 'http://localhost:8080/bible-be/';

    constructor(private http: HttpClient) {
    }

    getVerse(versionCode: string, bookId: number, chapterNumber: number, verseNumber: number): Observable<Verse> {
        const url: string = this.baseUrl + 'verse/' + versionCode + '/' + bookId + '/' + chapterNumber + '/' + verseNumber;
        return this.http.get<Verse>(url);
    }

}
