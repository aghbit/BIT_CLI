import { exec } from "child_process"
import { readdir, copyFile, statSync } from "fs"
import { Task } from "./classes"
import { checkIfTestWasExecutedAfterLastEdit, insertTaskIntoCsv } from "./csv"
import { parsePytestOutput } from "./parser"
import config from "./config.json"

export class Test {
    static testSingle(set: string, task: string, display: boolean, force: boolean): void {

        const userFile: string = `${config.path}/Workspace/Zestaw_${set}/t_${task}.py`
        const destFile: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}/prog.py`
        const editTime: number = statSync(userFile).mtimeMs

        if (checkIfTestWasExecutedAfterLastEdit(set, task, editTime) === false || force) {

            copyFile(userFile, destFile, (err) => {
                if (err) {
                    console.log(`Error while trying to access user's file at ${userFile}. Please check if the file exists.\n`)
                }
            })

            let testPath: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}`

            exec(`pytest -q --no-header ${testPath}`, (err, stdout, stderr) => {
                let result: Task = parsePytestOutput(err, stdout, stderr)
                
                result.setNumber = set
                result.taskNumber = task

                insertTaskIntoCsv(result) // Zapis do pliku csv
                if (display) result.displayContent()
            })
        }
    }

    static testSet(set: string, display: boolean, force: boolean): void {
        readdir(`${config.path}/WDI/Zestaw_${set}`, (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 7) === 'Zadanie') {
                    let task = file.slice(-2)
                    Test.testSingle(set, task, display, force)
                }
            })
        })
    }

    static testAll(display: boolean, force: boolean): void {
        readdir(`${config.path}/WDI`, (err, files) => {
            files.forEach(file => {
                if (file.slice(0, 6) === 'Zestaw') {
                    let set = file.slice(-1)
                    Test.testSet(set, display, force)
                }
            })
        })
    }
}
