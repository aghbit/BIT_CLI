import { existsSync, readFileSync, writeFileSync, appendFileSync} from 'fs'
import { Task } from "./classes"
import config from "./config.json"


// Returns line number where task was found,
// returns 0 if test was never executed or csv file doesn't exist
function findTestLine(set: string, task: string): number {

    if (existsSync(config.csvFileLocation) === false) return 0 // Csv file doesn't exist

    const csvContent: string = readFileSync(config.csvFileLocation, "utf-8")
    const lines: string[] = csvContent.split('\n')
    const noLines: number = lines.length - 1

    for (let i = 0; i < noLines; i++) {
        const fields: string[] = lines[i].split(',')

        if (fields[0] === set && fields[1] === task) {
            return i + 1 // Test found on line i+1
        }
    }
    return 0 // Task not found (test was never executed)
}


// Returns line number - where to insert new test results
function findLineOfInsertion(set: string, task: string): number {

    const csvContent: string = readFileSync(config.csvFileLocation, "utf-8")
    const lines: string[] = csvContent.split('\n')
    const noLines: number = lines.length - 1

    let i: number 
    if (config.csvFirstLineHeader) i = 1
    else i = 0
    
    for (i; i < noLines; i++) {
        const fields: string[] = lines[i].split(',')

        if ( ( Number(fields[0]) == Number(set) && Number(fields[1]) > Number(task) )
        || ( Number(fields[0]) > Number(set) ) ) {

            return i + 1 // Insert at line i + 1
        }
    }
    return noLines + 1 // Insert after last line
}


// Checks if test was executed after last edit,
// returns false if test was never executed or csv file doesn't exist
export function checkIfTestWasExecutedAfterLastEdit(set: string, task: string, lastEditTime: number): boolean {

    const lineNumber: number = findTestLine(set, task)
    if (lineNumber === 0) return false // Test was never executed or csv file doesn't exist

    const csvContent: string = readFileSync(config.csvFileLocation, "utf-8")
    const lines: string[] = csvContent.split('\n')
    const testTimestamp: number = Number(lines[lineNumber - 1].split(',')[6])

    if (testTimestamp < lastEditTime) return false // Test was executed before last edit

    return true // Test was executed after last edit
}


// Inserts task into csv file
export function insertTaskIntoCsv(task: Task): void {

    const date: Date = new Date()
    const newRow: string = [
        task.setNumber,
        task.taskNumber,
        task.noAllTests,
        task.noPassedTests,
        task.noFailedTests,
        task.noSkippedTests,
        date.getTime()
    ].join(',')

    const lineNumber: number = findTestLine(task.setNumber, task.taskNumber)

    if (lineNumber === 0) { // Task doesn't exist, adds new line

        // If csv file doesn't exist and csvFirstLineHeader == true, adds a header
        if (existsSync(config.csvFileLocation) === false && config.csvFirstLineHeader) {
            writeFileSync(config.csvFileLocation, "setNumber,taskNumber,numberOfAllTests,numberOfPassedTests,numberOfFailedTests,numberOfSkippedTests,unixTimestamp\n")
        }

        if (existsSync(config.csvFileLocation) && config.csvSaveInOrder) { // Saves in numerical order
            
            const lineOfInsertion: number = findLineOfInsertion(task.setNumber, task.taskNumber)
            const csvContent: string = readFileSync(config.csvFileLocation, "utf-8")
            const lines: string[] = csvContent.split('\n')

            let newLines: string[] = lines.slice(0, lineOfInsertion - 1)
            newLines.push(newRow)
            newLines = newLines.concat(lines.slice(lineOfInsertion - 1))

            writeFileSync(config.csvFileLocation, newLines.join('\n'))
        }

        else { // Saves in timestamp order
            appendFileSync(config.csvFileLocation, newRow + '\n')
        }
    }

    
    else { // Task exists, replaces line
        
        const csvContent: string = readFileSync(config.csvFileLocation, "utf-8")
        const lines: string[] = csvContent.split('\n')
        lines[lineNumber - 1] = newRow

        writeFileSync(config.csvFileLocation, lines.join('\n'))
    }
}
