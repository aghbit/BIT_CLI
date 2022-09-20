import { promises as fs, existsSync as exists, writeFileSync as write} from 'fs'
import { Task, SetOfTasks, Workspace } from "./classes";

// Saves test results from class Task to csv at 'path' location.
// Set append to true to add new row to an existing file, or to false to overwrite existing file.
export function save_task_to_csv(path: string, task: Task, append: boolean = true) {
    const row: string = [
        task.taskNumber,
        task.setNumber,
        task.noAllTests,
        task.noPassedTests,
        task.noFailedTests,
        task.noSkippedTests,
    ].join(',')

    if(append && exists(path)) {
        fs.appendFile(path, row + "\n", 'utf8')
    }
    else {
        const header: string = "taskNumber,setNumber,numberOfAllTests,numberOfPassedTests,numberOfFailedTests,numberOfSkippedTests\n"
        write(path, '\ufeff' // byte order mark (BOM)
        + header // first line header
        + row // test data
        + "\n", // endline after second line
        'utf8')
    }
}

// Saves tests results of set from class SetOfTasks to csv at 'path' location.
// Set append to true to add new rows to an existing file, or to false to overwrite existing file.
export function save_set_to_csv(path: string, set: SetOfTasks, append: boolean = true) {
    for (let i = 0; i < set.noTasks; i++) {
        save_task_to_csv(path, set.tableOfTasks[i], append)
    }
}

// Saves ALL tests results of entire workspace from class Workspace to csv at 'path' location.
// Set append to true to add new rows to an existing file, or to false to overwrite existing file.
export function save_workspace_to_csv(path: string, workspace: Workspace, append: boolean = true) {
    for (let i = 0; i < workspace.noSets; i++) {
        save_set_to_csv(path, workspace.tableOfSets[i], append)
    }
}

// Temporary function. Used for testing
function generate_set_of_tasks(no_tasks: number)
{
    const tasks: Task[] = []
    for (let i = 0; i < no_tasks; i++) {
        tasks.push(new Task(i+1, 1, 4, 3, 1, 0))
    }
    const set: SetOfTasks = new SetOfTasks(1, no_tasks, tasks)

    return set
}
// save_set_to_csv("test.csv", generate_set_of_tasks(3), true)
