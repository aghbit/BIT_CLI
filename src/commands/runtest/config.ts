import { Command, Flags } from "@oclif/core"
import { readFileSync, writeFileSync } from "fs"
import { resolve as resolvePath } from "path"


export default class Config extends Command {
    static flags = {
        path: Flags.string({ char: 'p', description: 'Define absolute path to project directory' }),
        csvFileLocation: Flags.string({ description: 'Define absolute path to CSV file that records test results' }),
        csvFirstLineHeader: Flags.boolean({
            allowNo: true, description:
                'Define if the CSV file has a header line. False by deafult. Use "--no-csvFirstLineHeader" to switch to false'
        }),
        csvSaveInOrder: Flags.boolean({
            allowNo: true, description:
                'Define if test results are recorded in numerical order. True by default. Use "--no-csvSaveInOrder" to switch to false. When false, test results are ordered by time of completion'
        }),
        display: Flags.boolean({ char: 'd', description: 'Display contents of the config file' })
    }

    async run() {
        const { flags } = await this.parse(Config)

        // W teorii powinienem zrobić interfejs dla typu Config, ale nie jest to tutaj raczej konieczne, więc daję typ any
        const config: any = JSON.parse(readFileSync(resolvePath(__dirname, "../../utils/config.json"), "utf-8"))

        if (flags.path) {
            config.path = flags.path
        }
        if (flags.csvFileLocation) {
            config.csvFileLocation = flags.csvFileLocation
        }
        if (flags.csvFirstLineHeader === true || flags.csvFirstLineHeader === false) {  // Porównanie do false, aby wykonało się w przypadku użycia --no-
            config.csvFirstLineHeader = flags.csvFirstLineHeader
        }
        if (flags.csvSaveInOrder === true || flags.csvSaveInOrder === false) {  // Jak wyżej
            config.csvSaveInOrder = flags.csvSaveInOrder
        }
        if (flags.display) {
            console.log(config)
        }

        writeFileSync(resolvePath(__dirname, "../../utils/config.json"), JSON.stringify(config))
    }
}
