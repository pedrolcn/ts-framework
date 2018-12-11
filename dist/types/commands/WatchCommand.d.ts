import BaseCommand from "../base/BaseCommand";
export default class WatchCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
    };
    run(entrypoint?: string): Promise<void>;
}
