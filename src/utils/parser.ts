import { ExecException } from "child_process";
import { Task } from "./classes"

export function parsePytestOutput(err: ExecException | null, stdout: string, stderr: string): Task {
    let currTask: Task = new Task()
    
    if (true) { //orginalnie if(err !== Null), ale wyrażenie zwraca false gdy pystest zwraca failed tests, do poprawienia
        const splitLines: string[] = stdout.split("\n")
        const splitLastLine: string[] = splitLines[splitLines.length - 2].split(",")

        for (let i = 0; i < splitLastLine.length; i++) {
            if (splitLastLine[i][0] === ' ') splitLastLine[i] = splitLastLine[i].substring(1)
            const numAndType: string[] = splitLastLine[i].split(" ")
            switch (numAndType[1]) {
                case "passed":
                    currTask.noPassedTests += Number(numAndType[0])
                    currTask.noAllTests += Number(numAndType[0])
                    break;

                case "failed":
                    currTask.noFailedTests += Number(numAndType[0])
                    currTask.noAllTests += Number(numAndType[0])
                    break;

                case "skipped":
                    currTask.noSkippedTests += Number(numAndType[0])
                    currTask.noAllTests += Number(numAndType[0])
                    break;
            
                default:
                    break;
            }
        }
    }

    return currTask
}
