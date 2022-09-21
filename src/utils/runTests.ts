import { exec } from "child_process"
import { readdir, copyFile } from "fs"
import { Task, SetOfTasks, Workspace } from "./classes"
import { parsePytestOutput } from "./parser"
import config from "./config.json"

export class Test {
    static testSingle(set: string, task: string): void {
        // Do sprawdzenia czy test był wykonywany po ostatniej edycji

        let userFile: string = `${config.path}/Workspace/Zestaw_${set}/t${task}`
        let destFile: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}/prog.py`

        copyFile(userFile, destFile, (err) => { if (err) throw err })

        let testPath: string = `${config.path}/WDI/Zestaw_${set}/Zadanie_${task}`

        exec(`pytest -q --no-header ${testPath}`, (err, stdout, stderr) => {
            let result: Task = parsePytestOutput(err, stdout, stderr)
            result.setNumber = Number(set)
            result.taskNumber = Number(task)
            // Do dopisania - przekazanie result do save_to_scv.ts
        })
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
