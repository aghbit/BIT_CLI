export class Task {
    setNumber: string
    taskNumber: string

    noAllTests: number
    noPassedTests: number
    noFailedTests: number
    noSkippedTests: number

    constructor(
        setNumber: string = "0",
        taskNumber: string = "0",
        noAllTests: number = 0,
        noPassedTests: number = 0,
        noFailedTests: number = 0,
        noSkippedTests: number = 0,
        ) {
            this.setNumber = setNumber
            this.taskNumber = taskNumber
            this.noAllTests = noAllTests
            this.noPassedTests = noPassedTests
            this.noFailedTests = noFailedTests
            this.noSkippedTests = noSkippedTests
    }
}
