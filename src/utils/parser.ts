import { ExecException } from "child_process";
import { Task } from "./classes"

export function parsePytestOutput(err: ExecException | null, stdout: string, stderr: string): Task {
    let currTask: Task = new Task()
    
    if (err !== null){
        const splitLines: string[] = stdout.split("\n")
        const splitLastLine: string[] = splitLines[splitLines.length - 1].split(",")
        // Możliwe że ostatnia linijka zawsze pusta (przez \n na końcu przedostatniej i później nic), wtedy wystarczy zrobić [length - 2],
        // ale szczerze mówiąc nie wiem jak to sprawdzić. Dowiemy się po skończeniu, wtedy najwyżej się zmieni tę jedną linijkę.

        for (let i = 0; i < splitLastLine.length; i++) {
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
