#!/usr/bin/env node

import * as Commander from "commander";
import { Logger, LoggerInstance } from "ts-framework-common";
import BaseCommand from "./base/BaseCommand";
import { ConsoleCommand, GenerateCommand, ListenCommand, RunCommand, WatchCommand } from "./commands";

export interface CommandLineOptions {
  logger?: LoggerInstance;
}

export const DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
export const DEFAULT_ENV = process.env.NODE_ENV || "development";
export const DEFAULT_PORT = process.env.PORT || 3000;

export default class CommandLine {
  public logger: LoggerInstance;
  public commands: BaseCommand[];
  protected program: Commander.Command;

  constructor(commands?: BaseCommand[], options?: CommandLineOptions) {
    const Package = require("../package.json");

    // Initialize Commander instance
    this.program = Commander.name(Package.name)
      .version(Package.version)
      .description(Package.description)
      .option("-v, --verbose", "enables verbose mode");

    // Prepare logger
    this.logger = Logger.getInstance();

    // Prepare command options
    const commandOpts = {
      entrypoint: DEFAULT_ENTRYPOINT,
      port: DEFAULT_PORT,
      env: DEFAULT_ENV
    };

    // Initialize default commands
    this.commands = commands || [
      new ListenCommand(commandOpts),
      new GenerateCommand(commandOpts),
      new ConsoleCommand(commandOpts),
      new RunCommand(commandOpts),
      new WatchCommand(commandOpts)
    ];

    // Starts command mounting
    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize(commands?: BaseCommand[]) {
    return new CommandLine(commands).parse();
  }

  public onError(error) {
    this.logger.error(error);

    // Async exit for log processing to occur before crashing
    setTimeout(() => process.exit(1), 500);
  }

  public async onMount() {
    // Handle verbnose mode
    this.program.on("option:verbose", function() {
      process.env.VERBOSE = this.verbose;
    });

    // Check TS Node is available
    try {
      require("ts-node/register/transpile-only");
    } catch (exception) {
      this.logger.warn(exception);
      this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
    }

    // Handle unknown commands
    this.program.on("command:*", args => {
      if (args && args.length && args[0] === "help") {
        this.program.outputHelp();
      } else {
        this.logger.error("Unknown syntax for command line" + "\n\nSee --help for a list of available commands.");
      }
      process.exit(1);
    });

    // Bind all commands to current program
    this.commands.map(cmd => cmd.onProgram(this.program));

    // Prepare additional info in help
    this.program.on("--help", () => {
      console.log("");
      console.log("Environment variables:");
      console.log("");
      console.log('  - ENTRYPOINT\t\t\tSets server entrypoint for execution. Defaults to: "./api/server.ts"');
      console.log('  - NODE_ENV\t\t\tSets the environment to run the server. Defaults to: "development"');
      console.log('  - PORT\t\t\tSets the port to listen to. Defaults to: "3000"');
      console.log("");
      console.log("Getting started:");
      console.log("");
      console.log("  $ ts-framework new app");
      console.log("  $ cd app/");
      console.log("  $ yarn start");
    });
  }

  parse() {
    this.program.parse(process.argv);
    return this;
  }
}

CommandLine.initialize();