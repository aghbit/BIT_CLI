import { exec } from "child_process";
import { readdir, copyFile } from "fs";

export class Test {
    static testSingle(set: string, task: string): void {
        // Do zrobienia po uzgodnieniu jak dokładnie będzie wyglądać workspace użytkownika
    }

    static testSet(set: string): void {
        readdir(`./WDI/Zestaw_${set}`, (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 7) === 'Zadanie') {
                    let task = file.slice(-2);
                    Test.testSingle(set, task);
                }
            });
        });
    }

    static testAll(): void {
        readdir('./WDI', (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 6) === 'Zestaw') {
                    let set = file.slice(-2);
                    Test.testSet(set);
                }
            });
        });
    }
}
