import * as Package from "pjson";
import * as Nodemon from "nodemon";
import BaseCommand from "../base/BaseCommand";

export default class WatchCommand extends BaseCommand {
  command = {
    syntax: "watch [entrypoint]",
    description: "Starts the development server with live reload"
  };

  public async run(entrypoint = this.options.entrypoint) {
    this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
    this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
    this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
    this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\``);

    Nodemon({
      delay: "1000",
      ext: "ts,js",
      cwd: process.cwd(),
      watch: ["./**/*"],
      ignore: ["./dist", "./build", "./docs", "./coverage"],
      exec: `ts-framework listen --development ${entrypoint}`
    });

    Nodemon.on("restart", files => {
      this.logger.debug("[ts-framework] restarting due to changes...", { files });
    });

    Nodemon.on("quit", () => {
      this.logger.debug("[ts-framework] terminating...");
      process.exit(1);
    });

    Nodemon.on("crash", error => {
      this.logger.warn("[ts-framework] instance crashed unexpectedly", error);
      this.logger.debug("[ts-framework] waiting for files changes before restarting...");
    });
  }
}