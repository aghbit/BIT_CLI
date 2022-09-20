export class Task {
    taskNumber: number
    setNumber: number
    noAllTests: number

    noPassedTests: number
    noFailedTests: number
    noSkippedTests: number

    constructor(
        taskNumber: number = 0,
        setNumber: number = 0,
        noAllTests: number = 0,
        noPassedTests: number = 0,
        noFailedTests: number = 0,
        noSkippedTests: number = 0,
        ) {
            this.taskNumber = taskNumber
            this.setNumber = setNumber
            this.noAllTests = noAllTests
            this.noPassedTests = noPassedTests
            this.noFailedTests = noFailedTests
            this.noSkippedTests = noSkippedTests
    }
}

export class SetOfTasks {
    setNumber: number
    noTasks: number
    tableOfTasks: Task[]

    constructor(
        setNumber: number = 0,
        noTasks: number = 0,
        tableOfTasks: Task[] = []
        ) {
            this.setNumber = setNumber
            this.noTasks = noTasks
            this.tableOfTasks = tableOfTasks
        }   
}

export class Workspace {
    noSets: number
    tableOfSets: SetOfTasks[]

    constructor(
        noSets: number = 0,
        tableOfSets: SetOfTasks[] = []
        ) {
            this.noSets = noSets
            this.tableOfSets = tableOfSets
        }      
}