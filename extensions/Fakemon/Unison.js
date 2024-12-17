// Name: Unison Kernel
// ID: unisonKernel
// Description: Lots of blocks to help you create your own operating systems, packed into one extension!
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// By: BambusOS <https://scratch.mit.edu/users/BambusOS/>
// License: MIT <https://opensource.org/license/MIT>
/*
MIT License

Copyright (c) 2024 Scratch_Fakemon and BambusOS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// Above is the TurboWarp Extension Info header. That makes sure our extension has the right info in the gallery!
// The real code begins here!
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Unison Kernel must be run unsandboxed!");
    // How could we show this on screen?
    // Sandboxed extensions can't use alert modals...
    
  }
  const vm = Scratch.vm;
  let buildType = "beta" // The type of build. (release, alpha, beta, pre, etc.) Unofficial builds should add "-custom" to the end to avoid confusion, especially if you don't change any branding.
  let buildNum = "1.0.0" // The current number of the build. (1.0.0, 2.0.4, 3.5.9, etc.) Unofficial builds should keep the build number the same as the base build.
  const translator = Scratch.translate; // An easier way to translate text.
  const semver = buildNum + "-" + buildType // The current version of Unison.
  console.log("Unison Kernel: Version " + semver + " loaded successfully!")
    
  if (!(buildType == "release")) {
    alert(Scratch.translate("This is a " + buildType + " build! There might be bugs..."))

}
  class UnisonFileSystem { // Bambus's recycled file system code.
    constructor() {
      this.info = {
        ufs_partition_name: "",
        ufs_partition_id: "",
        ufs_partition_version: 1,
        ufs_build: semver,
        root: true,
      };
      this._data = {};
      this._file = {
        filename: "",
        permissions: 1,
        folder: undefined,
        content: undefined,
      };
      this.activePath = "/";
    }
    _addObjectAbs(path, permissions, folder, content) { }
    _findObjectAbs(path) {
      let splitPath = path.split("/"); // the first index will always be blank
      let files = this._data;
      let dir = "";
      let i = 1; // i'm
      let j = 0; // just
      let k = 0; // kidding
      // i'm sorry for subjecting you to this (i didn't want it to use recursion)
      // -BambusOS
      // This is what happens when you look at Bambus's messy code LOL
      // -Scratch_Fakemon :)
      // @ts-ignore
      while (!(path === dir || dir.length() > path.length())) {
        // @ts-ignore
        for (i = 1; i < Object.keys(files).length(); i++) {
          if (`${path}/`.includes(`${dir}/${files[i]}/`)) {
            dir = `${dir}/${files[i].filename}`;
            j = i;
            if (
              files[i].folder || files[i].root &&
              path !== dir
            ) {
              files = files[i].content;
            }
          }
        }
        k++;
      }
      return files[j];
    }
    // _findObjectInActivePath(filename) {}
    import() { }
    export(JSON) {
      return JSON.jsonify({ ...this.info, content: this._data });
    }
    newFile(path, filename, content) { }
    newDirectory(path, filename) { }
  }
  const ufs = UnisonFileSystem;
  class UnisonKernel {
    constructor() {
      this.menulogo =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0My40IiBoZWlnaHQ9IjQzLjQiIHZpZXdCb3g9IjAsMCw0My40LDQzLjQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTguMywtMTU4LjMpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTkuMywxODBjMCwtMTEuNDMyMjkgOS4yNjc3MSwtMjAuNyAyMC43LC0yMC43YzExLjQzMjI5LDAgMjAuNyw5LjI2NzcxIDIwLjcsMjAuN2MwLDExLjQzMjI5IC05LjI2NzcxLDIwLjcgLTIwLjcsMjAuN2MtMTEuNDMyMjksMCAtMjAuNywtOS4yNjc3MSAtMjAuNywtMjAuN3oiIGZpbGw9IiNmYTgwMzMiIHN0cm9rZT0iI2UzOTE1ZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDcuNzcxMDEsMTY3LjI5NDE4bC0zLjQyMDgsMjAuMTU4M2MwLDAgLTEuMjUzMDksNC41MjAzNSAtNy41NzQ2Myw0LjUyMDM1Yy01LjI4MzA5LDAgLTUuOTg2NCwtNC41MjAzNSAtNS45ODY0LC00LjUyMDM1bDMuNDIwOCwtMjAuMTU4MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDkuMjM3MDcsMTkyLjcwNTg1YzAsMCAtMS4zNjQ4NywwLjE1MjQgLTMuNjE1ODcsLTEuOTA2NThjLTEuNjQzNDEsLTEuNTAzMiAtMC45MDQ0OCwtNC45MzUwMiAtMC45MDQ0OCwtNC45MzUwMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+";
      this.blocklogo =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MS40IiBoZWlnaHQ9IjQxLjQiIHZpZXdCb3g9IjAsMCw0MS40LDQxLjQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTkuMywtMTU5LjMpIj48ZyBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTkuMywxODBjMCwtMTEuNDMyMjkgOS4yNjc3MSwtMjAuNyAyMC43LC0yMC43YzExLjQzMjI5LDAgMjAuNyw5LjI2NzcxIDIwLjcsMjAuN2MwLDExLjQzMjI5IC05LjI2NzcxLDIwLjcgLTIwLjcsMjAuN2MtMTEuNDMyMjksMCAtMjAuNywtOS4yNjc3MSAtMjAuNywtMjAuN3oiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDcuNzcxMDEsMTY3LjI5NDE4bC0zLjQyMDgsMjAuMTU4M2MwLDAgLTEuMjUzMDksNC41MjAzNSAtNy41NzQ2Myw0LjUyMDM1Yy01LjI4MzA5LDAgLTUuOTg2NCwtNC41MjAzNSAtNS45ODY0LC00LjUyMDM1bDMuNDIwOCwtMjAuMTU4MyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDkuMjM3MDcsMTkyLjcwNTg1YzAsMCAtMS4zNjQ4NywwLjE1MjQgLTMuNjE1ODcsLTEuOTA2NThjLTEuNjQzNDEsLTEuNTAzMiAtMC45MDQ0OCwtNC45MzUwMiAtMC45MDQ0OCwtNC45MzUwMiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjIwLjY5OTk5OTk5OTk5OTk2OjIwLjY5OTk5OTk5OTk5OTk5LS0+";
      this.isInit = false;
      this.osName = "os name";
      this.fs = undefined;
      this.callData = undefined;
      this.apps = [];
      vm.on("PROJECT_START", () => {
        this.apps = [];
        let isDebugging;
        isDebugging = false;
      })
    }

    getInfo() {
      // Extension Info
      return {
        id: "unisonKernel",
        name: translator("Unison"),
        menuIconURI: this.menulogo,
        blockIconURI: this.blocklogo,
        color1: "#fa8033",
        // color2: "#e3915d", // Bambus is mad that color doesn't have a "u" in it. (I'm kidding) - Fakemon
        // color3: "#be5613", // Apparently TW is supposed to fill in the colors for you ¯\_(ツ)_/¯
        docsURI: "https://scratchfakemon.github.io/extensions/docs/Fakemon/Unison",
        // Blocks
        blocks: [
          

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Kernel Initialization"),
          },
          {
            opcode: "init",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("initialize kernel"),
          },
          {
            opcode: "reportIsInit",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is kernel initialized?"),
            disableMonitor: true,
          },
          {
            opcode: "whenInit",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when the kernel initializes"),
            isEdgeActivated: false
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("OS Info"),
          },

          {
            opcode: "getOsName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("os name"),
            disableMonitor: true,
          },
          {
            opcode: "setOsName",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set the os name to [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("os name"),
              },
            },
          },
          {
            opcode: "semver",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("kernel version"),
            disableMonitor: true,
          }, // MOVED FROM NAMELESS CATEGORY
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("File System (WIP)"),
          },
          {
            opcode: "makefile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create a new file named [NAME] with data [DATA]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, world!"),
              }
            }
          },
          {
            opcode: "delfile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete the file named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
            }
          },
          {
            opcode: "wipeFs",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("wipe the file system"),
          },
          {
            opcode: "editfile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("edit the contents of [NAME] with new data [DATA]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("What's up?"),
              },
            }
          },
          {
            opcode: "openfile",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("open file [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
            }
          },
          {
            opcode: "fileexists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("file [NAME] exists?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
            }
          },
          {
            opcode: "filesystem",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("file system data"),
            disableMonitor: true,
          },
          , 
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Apps"),
          },
          {
            opcode: "listApps",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all installed apps"),
            disableMonitor: true,
          },
          {
            opcode: "declareApp",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("declare a/an [APPTYPE] called [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my-app"),
              },
              APPTYPE: {
                type: Scratch.ArgumentType.STRING,
               menu: "AT_MENU"
              }
            }
          },
          {
            opcode: "whenAppDeclared",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when [APPTYPE] [NAME] gets declared"),
            isEdgeActivated: false,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my-app"),
              },
              APPTYPE: {
                type: Scratch.ArgumentType.STRING,
               menu: "AT_MENU"
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Calls"),
          },
          {
            opcode: "sendCall",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send call with id [CALL_ID] and data [CALL_DATA]"),
            arguments: {
              CALL_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
              CALL_DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "bar",
              },
            },
          },
          {
            opcode: "receiveCall",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when I receive call [CALL_ID]"),
            //isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              CALL_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
            },
          },
          {
            opcode: "retCallData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("received call data"),
          },
          {
            opcode: "retCallID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("latest call id"),
          },
          {
            opcode: "retCall",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("latest call"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Terminal (WIP)"),
          },
          {
            opcode: "shTerm",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[SH] the terminal"),
            arguments: {
              SH: {
                type: Scratch.ArgumentType.STRING,
                menu: "SH_MENU",
              },
              
            },
          },
          {
            opcode: "termShown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("terminal is [SH2]"),
            arguments: {
              SH2: {
                type: Scratch.ArgumentType.STRING,
                menu: "SH2_MENU",
              },
              
            },
            
            
          },
          {
            opcode: "exportTerm",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export the terminal"),
            disableMonitor: true
            
          },
          {
            opcode: "termLine",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("line [LNUM] of terminal"),
            arguments: {
              LNUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            }
            
          },
          {
            opcode: "addCmd",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[DO] the [CMD] command"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
              DO: {
                type: Scratch.ArgumentType.STRING,
                menu: "DO_MENU",
              },
              
            },
            
            
          },
          {
            opcode: "cmdExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("command named [CMD] [EXIST]"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
              EXIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "EXISTS_MENU",
              },
              
            },
            
            
          },
          {
            opcode: "forceRunCmd",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("run command [CMD]"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
            }
            
          },
          {
            opcode: "cmdRun",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when [CMD] is run"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
              
            },
            
            
          },
          {
            opcode: "cancelCmd",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("cancel currently running commands")
          },
          {
            opcode: "allCmds",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all terminal commands"),
            disableMonitor: true
            
          },
          {
            opcode: "setIcon",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set terminal icon to [ICON]"),
            arguments: {
              ICON: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: "0101001010010100111000001",
              },
              
            },
            
          },
          {
            opcode: "setIconCostume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set terminal icon to [ICON]"),
            arguments: {
              ICON: {
                type: Scratch.ArgumentType.COSTUME,
                //defaultValue: "",
              },
              
            },
            
          },
          {
            opcode: "setIconURI",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set terminal icon to [ICON]"),
            arguments: {
              ICON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.png",
              },
              
            },
            
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text color to [COLOR]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
              
            },
            
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Accounts (WIP)"),
          },
          {
            opcode: "addAcc",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[DO] the account [ACC] with password [PASS]"),
            arguments: {
              ACC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "User",
              },
              PASS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              DO: {
                type: Scratch.ArgumentType.STRING,
                menu: "DO_MENU",
              },
              
            },
            
          },
          {
            opcode: "allAccs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all accounts"),
            
          },
          {
            opcode: "login",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("log into the account [ACC] with password [PASS]"),
            arguments: {
              ACC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "User",
              },
              PASS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              
            },
            
          },
          {
            opcode: "logout",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("log out of account"),
          },
          {
            opcode: "currentAcc",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current account"),
            
          },
          {
            opcode: "updateAcc",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("update [ACC] to username [ACCNEW] with password [PASS]"),
            arguments: {
              ACC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "User",
              },
              ACCNEW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Foo",
              },
              PASS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Bar",
              },
              
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Boot Manager"),
          },
          {
            opcode: "shBoot",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[SH] boot manager"),
            arguments: {
              SH: {
                type: Scratch.ArgumentType.STRING,
                menu: "SH_MENU",
              },
              
            },
          },
          {
            opcode: "addBoot",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[DO] boot option [OPTION]"),
            arguments: {
              DO: {
                type: Scratch.ArgumentType.STRING,
                menu: "DO_MENU",
              },
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.osName,
              },
              
            },
          },
          {
            opcode: "bootReg",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [OPTION] registered?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.osName,
              },
              
            },
          },
          {
            opcode: "allReg",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all registered options"),
            arguments: {
              YOUR_MUM: { // I'm American and I still put mum. YOU CANT STOP MEEEEEEEEEEEE--  (Fakemon)
                type: "1 diabetes", // That's what she said
                defaultValue: "You're grounded!" // That's ALSO what she said
              }
            }
          },
          {
            opcode: "onBoot",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when [OPTION] selected"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.osName,
              },
              
            },
          },
          {
            opcode: "autoBoot",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("boot into [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.osName,
              },
              
            },
          },
          {
            opcode: "bootMgrStyle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("use [STYLE] boot manager"),
            arguments: {
              STYLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BOOTMGRSTYLE_MENU",
              },
              
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Debugging"),
          },
          {
            opcode: "debugStart",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[THING] debugging"),
            arguments: {
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "STARTSTOP_MENU"
              },
              
            },
          },
          {
            opcode: "debugState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is in debug mode?"),
          },
          {
            opcode: "debugLogs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug logs"),
          },
          {
            opcode: "runDebugCommand",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("run debug command [CMD]"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "greenFlag",
              },
              
            },
          },
         /* {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Other"),    
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("(Nothing here yet LOL)"),    
          }, */
          
         
         
          


        ],
        // Menus
        menus: {
          SH_MENU: {
            acceptReporters: false,
            items: [
              {
                text: 'show',
                value: 'show'
              },
              {
                text: 'hide',
                value: 'hide'
              }
              
            ]
          },
          DO_MENU: {
            acceptReporters: false,
            items: [
              {
                text: 'add',
                value: 'add'
              },
              {
                text: 'remove',
                value: 'rem'
              }
              
            ]
          },
          EXISTS_MENU: {
            acceptReporters: false,
            items: [
              {
                text: 'exists',
                value: 'does'
              },
              {
                text: "doesn't exist",
                value: 'doesnt'
              }
              
            ]
          },
          SH2_MENU: {
            acceptReporters: false,
            items: [
              {
                text: 'shown',
                value: 'show'
              },
              {
                text: 'hidden',
                value: 'hide'
              }
              
            ]
          },
          STARTSTOP_MENU: {
            acceptReporters: false,
            items: [
              {
                text: 'start',
                value: 'start'
              },
              {
                text: 'stop',
                value: 'stop'
              }
              
            ]
          },
          AT_MENU: {
            acceptReporters: true,
            items: [
              {
                text: 'app',
                value: 'app'
              },
              {
                text: 'addon',
                value: 'add'
              },
              {
                text: 'object',
                value: 'obj'
              },
              {
                text: 'parent',
                value: 'par'
              },
              {
                text: 'child',
                value: 'chi'
              },
              {
                text: 'extension',
                value: 'ext'
              },
              {
                text: 'subkernel',
                value: 'subkern'
              },

              { // Other should ALWAYS be the last option.
                text: 'other',
                value: 'oth'
              },
              
            ]
          },
          BOOTMGRSTYLE_MENU: {
            acceptReporters: true,
            items: ["graphical", "terminal"]
          },
          
          
          
        }
        
      };
      // Block Definitions
    }
    semver() {
      return semver;
    }
    init() {
      this.fs = new UnisonFileSystem();
      this.isInit = true;
      vm.runtime.startHats("unisonKernel_whenInit", {});
      return;
    }
    reportIsInit() {
      return !!this.isInit;
    }
    listApps(JSON) {
      return "[" + this.apps + "]" // The apps already have quotes around them. This is just a bad array. - Fakemon, who knows nothing about our precious JavaScript Object Node Arrays.
      //return JSON.jsonify(this.apps) // Why aren't we using this, you may ask? ... It's broken. Always has been. (I might know how to fix it, but TOO BAD!) - Fakemon
    }
    setOsName({ NAME }) {
      this.osName = NAME;
    }
    getOsName() {
      return this.osName;
    }
    declareApp({ NAME }) {
      vm.runtime.startHats("unisonKernel_whenAppDeclared", {
        NAME: NAME
      })
      this.apps = [...this.apps, '"'+ NAME +'"'];
    }
    whenAppDeclared({ NAME }) {
      return false; // TODO
    }
    sendCall(args, util) {
      this.callData = args.CALL_DATA;
      this.callID = args.CALL_ID;
      console.log("unisonKernel_receiveCall", {CALL_ID: args.CALL_ID, shouldRestartExistingThreads: true});
      console.log(args, util)
      //util.startHats("unisonKernel_receiveCall", {CALL_ID: args.CALL_ID, shouldRestartExistingThreads: true}); // Old bad yucky code for starting the hat. 🤮
      util.startHats("unisonKernel_receiveCall"); // New clean shiny code for starting the hat. 😍
        }
    retCallData() {
      console.log(this.callData)
      return this.callData;
    }
    retCallID() {
      console.log(this.callID)
      return this.callID;}
    receiveCall({ CALL_ID }) {
      return Scratch.Cast.compare(CALL_ID, this.callID) === 0;
    }
    retCall() { // If we can get the ID and Data of a call... (Just trying to help out users ig) - Fakemon :)
      return this.callID + ":" + this.callData // Looks like ID:Data. I don't think it needs changing. :P
    }
  
  makefile(args) { 
    return false; // no file system yet very brokey lol
  }
  delfile(args) { 
    return false; // no file system yet very brokey lol
  }
  wipeFs(args) { 
    return false; // no file system yet very brokey lol
  }
  editfile(args) { 
    return false; // no file system yet very brokey lol
  }
  openfile(args) { 
    return "Not implemented yet!"; // no file system yet very brokey lol
  }
  fileexists(args) { 
    return false; // no file system yet very brokey lol
  }
  filesystem(args) { 
    return "[]"; // no file system yet very brokey lol
  }
  shTerm(args) { 
    return false; // TO DO
  }
  exportTerm(args) { 
    return "Not implemented yet!"; // TO DO
  }
  addCmd(args) { 
    return false; // TO DO
  }
  allCmds(args) { 
    return "Not implemented yet!"; // TO DO
  }
  termLine(args) { 
    return "Not implemented yet!"; // TO DO
  }
  forceRunCmd(args) { 
    return false; // TO DO
  }
  cmdExists(args) { 
    return false; // TO DO
  }
  termShown(args) { 
    return false; // TO DO
  }
  setIcon(args) { 
    let terminalIcon = "Matrix: " + args.ICON;
    console.log("Terminal icon set to " + terminalIcon)
    return;
  }
  setIconCostume(args) { 
    let terminalIcon = "Costume: " + args.ICON;
    console.log("Terminal icon set to " + terminalIcon)
    return;
  }
  setColor(args) { 
    let terminalColor = args.COLOR;
    console.log("Terminal color set to " + terminalColor)
    return;
  }
  addAcc(args) { 
    return;
  }
  allAccs(args) { 
    return "Nope";
  }
  login(args) { 
    return;
  }
  logout(args) { 
    return;
  }
  currentAcc(args) { 
    return "Nope";
  }
  updateAcc(args) { 
    return;
  }
  shBoot(args) { 
    return;
  }
  addBoot(args) { 
    return;
  }
  autoBoot(args) { 
    return;
  }
  cancelCmd(args) { 
    return;
  }
  debugStart(args) { 
    return;
  }
debugState(args) { 
return false;
}
debugLogs(args) { 
  return "Not ready yet :P";
  }
  bootReg(args) { 
    console.log (Scratch.Cast.toBoolean(args.OPTION));
    return Scratch.Cast.toBoolean(args.OPTION);
    }
    allReg(args) { 
      return 'Scratch.translate("Nie") for me, will ya?' // H U M O R
      }
      runDebugCommand(args) { 
        return args.CMD; // It's a command so it won't return anything. I was just ~~le bored~~
        }
        bootMgrStyle(args) { 
          return true;
          }
          setIconURI(args) { 
            let terminalIcon = "URI: " + args.ICON;
    console.log("Terminal icon set to " + terminalIcon)
    return;
            }
    
  }
  Scratch.extensions.register(new UnisonKernel());
})(Scratch);
