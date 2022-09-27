import { ExecException } from "child_process";
import { Task } from "./classes"

export function parsePytestOutput(err: ExecException | null, stdout: string, stderr: string): Task {
    let currTask: Task = new Task()
    let exitCode: number | undefined = err?.code

    if (exitCode === undefined || exitCode === 0 || exitCode === 1) { // 0 lub undefined - brak błędu, 1 - nie przeszło niektórych testów
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
    } else if (exitCode === 2) {
        throw new Error("INTERRUPTED")
    } else if (exitCode === 3) {
        throw new Error("INTERNAL_ERROR")
    } else if (exitCode === 4) {
        throw new Error("USAGE_ERROR")
    } else if (exitCode === 5) {
        throw new Error("NO_TESTS_COLLECTED")
    }

    return currTask
}
