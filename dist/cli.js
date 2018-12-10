#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commander = require("commander");
const Package = require("pjson");
const commands_1 = require("./commands");
class CommandLine {
    constructor() {
        this.program = Commander.name(Package.name)
            .version(Package.version)
            .description(Package.description);
        this.onMount().catch(this.onError.bind(this));
    }
    static initialize() {
        new CommandLine().parse();
    }
    onError(error) {
        console.error(error);
        process.exit(1);
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle verbnose mode
            this.program.on("option:verbose", function () {
                process.env.VERBOSE = this.verbose;
            });
            // Check TS Node is available
            try {
                const tsNode = require("ts-node/register/transpile-only");
            }
            catch (exception) {
                console.warn(exception);
                console.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
            }
            // Handle unknown commands
            this.program.on("command:*", () => {
                console.error("Invalid syntax for command line" + "\nSee --help for a list of available commands.");
                process.exit(1);
            });
            this.program
                .command("listen [entrypoint]")
                .description("Runs the server in a single process")
                .option("-d, --development", "Starts server without production flags")
                .action((entrypoint = "./api/server.ts", options = {}) => new commands_1.ListenCommand().run({
                entrypoint,
                env: options.development ? "development" : "production"
            }));
            this.program
                .command("console [entrypoint]")
                .description("Run interactive console")
                .action((entrypoint = "./api/server.ts") => new commands_1.ConsoleCommand().run({ entrypoint }));
            this.program
                .command("run [entrypoint]")
                .option("-d, --development", "Starts server without production flags")
                .description("Runs the server components without lifting express")
                .action((entrypoint = "./api/server.ts", options = {}) => new commands_1.RunCommand().run({
                entrypoint,
                env: options.development ? "development" : "production"
            }));
            this.program
                .command("watch [entrypoint]")
                .description("Run the development server with live reload")
                .action((entrypoint = "./api/server.ts") => new commands_1.WatchCommand().run({ entrypoint }));
            this.program
                .command("new <component> [name]")
                .option("-s, --skip-install", "Skips yarn installation and post generation routines")
                .description("Generates a new TS Framework project")
                .action((component, name, options = {}) => new commands_1.GenerateCommand().run({
                name,
                component,
                skipInstall: options.skipInstall
            }));
        });
    }
    parse() {
        this.program.parse(process.argv);
    }
}
exports.default = CommandLine;
CommandLine.initialize();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMseUNBQXNHO0FBRXRHLE1BQXFCLFdBQVc7SUFJOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDekY7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNwRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2lCQUM5QixXQUFXLENBQUMscUNBQXFDLENBQUM7aUJBQ2xELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztpQkFDckUsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLGlCQUFpQixFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN2RCxJQUFJLHdCQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLFVBQVU7Z0JBQ1YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWTthQUN4RCxDQUFDLENBQ0gsQ0FBQztZQUVKLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0IsV0FBVyxDQUFDLHlCQUF5QixDQUFDO2lCQUN0QyxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsT0FBTztpQkFDVCxPQUFPLENBQUMsa0JBQWtCLENBQUM7aUJBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztpQkFDckUsV0FBVyxDQUFDLG9EQUFvRCxDQUFDO2lCQUNqRSxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQ3ZELElBQUkscUJBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDbkIsVUFBVTtnQkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZO2FBQ3hELENBQUMsQ0FDSCxDQUFDO1lBRUosSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2lCQUM3QixXQUFXLENBQUMsNkNBQTZDLENBQUM7aUJBQzFELE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx1QkFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRGLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztpQkFDakMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLHNEQUFzRCxDQUFDO2lCQUNwRixXQUFXLENBQUMsc0NBQXNDLENBQUM7aUJBQ25ELE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQ3hDLElBQUksMEJBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDeEIsSUFBSTtnQkFDSixTQUFTO2dCQUNULFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVzthQUNqQyxDQUFDLENBQ0gsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBekZELDhCQXlGQztBQUVELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0ICogYXMgQ29tbWFuZGVyIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBXYXRjaENvbW1hbmQsIFJ1bkNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwcm90ZWN0ZWQgcHJvZ3JhbTogQ29tbWFuZGVyLkNvbW1hbmQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgIG5ldyBDb21tYW5kTGluZSgpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwib3B0aW9uOnZlcmJvc2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLmVudi5WRVJCT1NFID0gdGhpcy52ZXJib3NlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgY29uc3QgdHNOb2RlID0gcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oZXhjZXB0aW9uKTtcbiAgICAgIGNvbnNvbGUud2FybihcIlxcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b24ndCBiZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVua25vd24gY29tbWFuZHNcbiAgICB0aGlzLnByb2dyYW0ub24oXCJjb21tYW5kOipcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgc3ludGF4IGZvciBjb21tYW5kIGxpbmVcIiArIFwiXFxuU2VlIC0taGVscCBmb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBjb21tYW5kcy5cIik7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwibGlzdGVuIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVucyB0aGUgc2VydmVyIGluIGEgc2luZ2xlIHByb2Nlc3NcIilcbiAgICAgIC5vcHRpb24oXCItZCwgLS1kZXZlbG9wbWVudFwiLCBcIlN0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzXCIpXG4gICAgICAuYWN0aW9uKChlbnRyeXBvaW50ID0gXCIuL2FwaS9zZXJ2ZXIudHNcIiwgb3B0aW9ucyA9IHt9KSA9PlxuICAgICAgICBuZXcgTGlzdGVuQ29tbWFuZCgpLnJ1bih7XG4gICAgICAgICAgZW50cnlwb2ludCxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBcInByb2R1Y3Rpb25cIlxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJjb25zb2xlIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVuIGludGVyYWN0aXZlIGNvbnNvbGVcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSBcIi4vYXBpL3NlcnZlci50c1wiKSA9PiBuZXcgQ29uc29sZUNvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJydW4gW2VudHJ5cG9pbnRdXCIpXG4gICAgICAub3B0aW9uKFwiLWQsIC0tZGV2ZWxvcG1lbnRcIiwgXCJTdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFnc1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSBcIi4vYXBpL3NlcnZlci50c1wiLCBvcHRpb25zID0ge30pID0+XG4gICAgICAgIG5ldyBSdW5Db21tYW5kKCkucnVuKHtcbiAgICAgICAgICBlbnRyeXBvaW50LFxuICAgICAgICAgIGVudjogb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IFwicHJvZHVjdGlvblwiXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcIndhdGNoIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVuIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIgd2l0aCBsaXZlIHJlbG9hZFwiKVxuICAgICAgLmFjdGlvbigoZW50cnlwb2ludCA9IFwiLi9hcGkvc2VydmVyLnRzXCIpID0+IG5ldyBXYXRjaENvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJuZXcgPGNvbXBvbmVudD4gW25hbWVdXCIpXG4gICAgICAub3B0aW9uKFwiLXMsIC0tc2tpcC1pbnN0YWxsXCIsIFwiU2tpcHMgeWFybiBpbnN0YWxsYXRpb24gYW5kIHBvc3QgZ2VuZXJhdGlvbiByb3V0aW5lc1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiR2VuZXJhdGVzIGEgbmV3IFRTIEZyYW1ld29yayBwcm9qZWN0XCIpXG4gICAgICAuYWN0aW9uKChjb21wb25lbnQsIG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cbiAgICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZCgpLnJ1bih7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgc2tpcEluc3RhbGw6IG9wdGlvbnMuc2tpcEluc3RhbGxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=