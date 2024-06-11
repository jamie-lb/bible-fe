import {BibleVersion} from "./bible-version";
import {Book} from "./book";

export class Verse {

    id: number | undefined;
    version: BibleVersion | undefined;
    verseText: string | undefined;
    book: Book | undefined;
    chapterNumber: number | undefined;
    verseNumber: number | undefined;

}
