import { Command, Flags } from "@oclif/core"
import { Test } from "../../utils/runTests"


export default class Runtest extends Command {
    static flags = {
        set: Flags.string({ char: 's', description: 'Set to test' }),
        task: Flags.string({ char: 't', description: 'Task to test', dependsOn: ['set'] }),
        display: Flags.boolean({ char: 'd', description: 'Display test results in terminal', default: false }),
        force: Flags.boolean({ char: 'f', description: 'Force test execution regardless of whether user file was edited since last test.', default: false })
    }

    async run() {
        const { flags } = await this.parse(Runtest)

        if (flags.set) {
            if (flags.task) {
                let task: string = flags.task
                if (task.length === 1) task = "0" + flags.task
                Test.testSingle(flags.set, task, flags.display, flags.force)
            } else {
                Test.testSet(flags.set, flags.display, flags.force)
            }
        } else {
            Test.testAll(flags.display, flags.force)
        }
    }
}
