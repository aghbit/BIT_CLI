import { ExecException } from "child_process";
import { Task } from "./classes"

export function parsePytestOutput(err: ExecException | null, stdout: string, stderr: string): Task {
    let currTask: Task = new Task()
    // Tu parsowanie outputu z pytesta, zrobię później i na innym branchu
    return currTask
}