import { exec } from "child_process"
import { readdir, copyFile } from "fs"
import { Task } from "./classes"
import { checkIfTestWasExecutedAfterLastEdit, insertTaskIntoCsv } from "./csv"
import { parsePytestOutput } from "./parser"
import config from "./config.json"

export class Test {
    static testSingle(set: string, task: string): void {

        const userFile: string = `${config.path}/Workspace/Zestaw_${set}/t_${task}.py`
        const destFile: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}/prog.py`

        // ostatni argument to timestamp ostatniej edycji zadania
        // należy zczytać timestamp z właściwości pliku userFile i przekazać wartość jako 3. argument
        // (tutaj przekazana bardzo duża liczba w celu testowania tak aby funkcja zawsze zwracała false)
        //                                                            ||
        //                                                            ||
        //                                                            \/
        if (checkIfTestWasExecutedAfterLastEdit(set, task, 166381175840090534744444) === false) {

            copyFile(userFile, destFile, (err) => { if (err) throw err })

            let testPath: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}`

            exec(`pytest -q --no-header ${testPath}`, (err, stdout, stderr) => {
                let result: Task = parsePytestOutput(err, stdout, stderr)
                result.setNumber = Number(set)
                result.taskNumber = Number(task)

                insertTaskIntoCsv(result) // Zapis do pliku csv
            })
        }
    }

    static testSet(set: string): void {
        readdir(`${config.path}/WDI/Zestaw_${set}`, (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 7) === 'Zadanie') {
                    let task = file.slice(-2)
                    Test.testSingle(set, task)
                }
            })
        })
    }

    static testAll(): void {
        readdir(`${config.path}/WDI`, (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 6) === 'Zestaw') {
                    let set = file.slice(-2)
                    Test.testSet(set)
                }
            })
        })
    }
}
