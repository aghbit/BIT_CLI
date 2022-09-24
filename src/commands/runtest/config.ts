import { Command, Flags } from "@oclif/core"
import config from "../../utils/config.json"


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
        })
    }

    async run() {
        const { flags } = await this.parse(Config)

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
            config.csvSaveInOrder = flags.csvFirstLineHeader
        }
    }
}
