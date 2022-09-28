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

        let now: Date = new Date()
        let editTime: number = now.getTime()
        try {
            editTime = statSync(userFile).mtimeMs
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                console.log(`File not found at ${userFile}.\n`)
            } else {
                throw err
            }
        }

        if (checkIfTestWasExecutedAfterLastEdit(set, task, editTime) === false || force) {
            copyFile(userFile, destFile, (err) => {
                if (err && err.code !== 'ENOENT') {
                    throw err
                }
            })

            let testPath: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}`

            exec(`pytest -q --no-header ${testPath}`, (err, stdout, stderr) => {
                let result: Task = new Task()

                try {
                    result = parsePytestOutput(err, stdout, stderr)
                } catch (error: any) {
                    switch(error.message) {
                        case "INTERRUPTED":
                            console.log(`Test execution interrupted while testing set ${set} task ${task}.\n`)
                            break
                        
                        case "INTERNAL_ERROR":
                            console.log(`Internal pytest error while testing set ${set} task ${task}.\n`)
                            break

                        case "USAGE_ERROR": // Nie powinno nigdy wyskakiwać, bo to my wywołujemy pytest
                            console.log(`Pytest was misused while testing set ${set} task ${task}.\n`)
                            break

                        case "NO_TESTS_COLLECTED":
                            console.log(`No tests found at ${testPath}. Please make sure the project is set up correctly.\n`)
                            break

                        default:
                            throw error
                    }
                }

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
