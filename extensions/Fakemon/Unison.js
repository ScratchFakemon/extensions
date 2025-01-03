// Name: Unison Kernel
// ID: unisonKernel
// Description: Lots of blocks to help you create your own operating systems, packed into one extension!
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// By: BambusOS <https://scratch.mit.edu/users/BambusOS/>
// License: MIT <https://opensource.org/license/MIT>

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Unison Kernel must be run unsandboxed!");
  }
  const vm = Scratch.vm;

  // The type of build. (release, alpha, beta, pre, etc.) 
  // Unofficial builds should add "-custom" to the end to avoid confusion, especially if you don't change any branding.
  let buildType = "beta"

  // The current number of the build. (1.0.0, 2.0.4, 3.5.9, etc.)
  // Unofficial builds should keep the build number the same as the base build.
  let buildNum = "1.0.0"

  // Debugging flag - if set to true, messages will be sent to the JavaScript console
  let debug = false;

  // The current version of Unison.
  const semver = `${buildNum}-${buildType}`

  const translator = Scratch.translate; // An easier way to translate text.
  console.log("Unison Kernel: Version " + semver + " loaded successfully!")
  if (!(buildType == "release")) {
    alert(Scratch.translate("This is a " + buildType + " build! There might be bugs..."))

  }

  class UnisonFileSystem {
    constructor() {
      this.fsMetadata = {
        partitionName: "",
        partitionId: "",
        mcfdVersion: 2,
        build: semver,
      };

      this.fsContent = [
        { root: true, 
          id: "root",
           content: [] }
      ];

      this.error = {
        ok: "Object is OK!",
        notFound: "Object not found!",
        notAllowed: "Access to object is denied!",
        corrupted: "Object is corrupted!",
        other: "Error not specified."
      };

      this.objectTypes = {
        other: 0,
        file: 1,
        folder: 2,
        directory: 2,
        dir: 2,
        link: 3,
        symlink: 3
      };

      this.blankObjects = {
        file: {
          name: "",
          type: this.objectTypes.file,
          id: "",
          parent: "",
          content: ""
        },
        folder: {
          name: "",
          type: this.objectTypes.folder,
          id: "",
          parent: "",
          content: []
        },
        link: {
          name: "",
          type: this.objectTypes.link,
          id: "",
          parent: "",
          content: ""
        }
      };
    }
    _randomHex(length) {
      let buffer = "";
      let combinations = "0123456789abcdef".split("");
      for (let i = 0; i < length; i++) {
        buffer += combinations[Math.round(Math.random() * 15)];
      }
      return buffer;
    }
    readObjectById(id) {
      this.fsContent.forEach(object => {
        if (object.id === id) {
          return object;
        }
      })
      return { error: this.error.notFound };
    }
    writeToObjectById(id, name, content) {
      let target = this.readObjectById(id);
      if (target.hasOwnProperty("error")) {
        return target.error
      }
      target.name = name ? name : target.name;
      target.content = content ? content : target.content;
      this.fsContent.forEach(object => {
        if (object.id === target.id) {
          object.id = target.id
        }
      })
      return;
    }
    putNewObject(name, type, content) {
      let newObject = this.blankObjects[type];
      newObject.name = name;
      newObject.id = this._randomHex(32)
      if (!type === this.objectTypes.folder) {
        newObject.type = type
      } else {
        newObject.type = this.objectTypes.folder
      }
      this.fsContent.push(newObject);
      return;
    }
    impor() { }
    export() {
      return JSON.jsonify({ ...this.fsMetadata, content: this._data });
    }
    newFile(path, filename, content) { }
    newDirectory(path, filename) { }
  }

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
      this.ufs = new UnisonFileSystem();
      vm.on("PROJECT_START", () => {
        this.apps = [];
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
            text: Scratch.translate("OS & Kernel Info"),
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
            text: Scratch.translate("create a new file named [NAME] with data [DATA] and alias [ALIAS]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, world!"),
              },
              ALIAS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              }
            }
          },
          {
            opcode: "makefolder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create a new folder named [NAME] and alias [ALIAS]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Folder1",
              },
              ALIAS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("My Folder"),
              }
            }
          },
          /*{ // to anyone seeing this, we were going to have a symbolic link feature, but we decided not to. You can still find some traces of symlinks in this pile of spaghetti code, though!
            opcode: "makesymlink",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create a new symbolic link named [NAME] to path [PATH] and alias [ALIAS]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "toHello",
              },
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("/Folder1/Hello.txt"),
              },
            }
          },*/
          {
            opcode: "uploadFileWithType",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("upload a .[TYPE] file"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "txt",
              },
            }
          },
          {
            opcode: "uploadFileWithoutType",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("upload a file"),
          },
          {
            opcode: "uploadFolder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("upload a folder"),
          },
          {
            opcode: "moveTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move to the path [PATH]"),
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("/Folder1/Hello.txt"),
              },
            }
          },
          {
            opcode: "moveMode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[ACTION] create new folder when unknown path accessed"),
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "MOVE_ACTION",
              },
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
            opcode: "moveFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move [FILE] to [PATH]"),
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("/$recycle.bin"),
              },
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("hello.txt"),
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
            text: Scratch.translate("edit the contents of [NAME] with new data [DATA] and new alias [ALIAS]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("What's up?"),
              },
              ALIAS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
            }
          },
          {
            opcode: "renamefile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("rename [NAME] to [NEWNAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              NEWNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Foo",
              },
            }
          },
          {
            opcode: "refile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("rename [NAME] to [NEWNAME] with data [DATA]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello.txt",
              },
              NEWNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Foo",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Bar",
              }
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
            text: Scratch.translate("file or folder [NAME] exists?"),
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
          {
            opcode: "currentFolder",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all files in this folder"),
            disableMonitor: true,
          },
          {
            opcode: "zipExport",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("export file system as .zip"),
          },
          {
            opcode: "zipImport",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import file system from a .zip file and [DOTOFILES] current file system"),
            arguments: {
              DOTOFILES: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILE_MODE",
              },
            }
          },
          
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
            text: Scratch.translate("declare [APPTYPE] called [NAME]"),
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
            text: Scratch.translate("set terminal icon to drawing [ICON]"),
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
            text: Scratch.translate("set terminal icon to costume [ICON]"),
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
            text: Scratch.translate("set terminal icon to url [ICON]"),
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
            text: Scratch.translate("is [OPTION] [REGISTER]?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.osName,
              },
              REGISTER: {
                type: Scratch.ArgumentType.STRING,
                menu: "REGISTER_STATUS",
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
          }


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
          REGISTER_STATUS: {
            acceptReporters: true,
            items: ["registered", "unregistered"]
          },
          FILE_MODE: {
            acceptReporters: true,
            items: ["keep", "replace"]
          },
          MOVE_ACTION: {
            acceptReporters: true,
            items: ["do", "don't"]
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
      this.apps = [...this.apps, '"' + NAME + '"'];
    }
    whenAppDeclared({ NAME }) {
      return false; // TODO
    }
    sendCall(args, util) {
      this.callData = args.CALL_DATA;
      this.callID = args.CALL_ID;
      console.log("unisonKernel_receiveCall", { CALL_ID: args.CALL_ID, shouldRestartExistingThreads: true });
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
      return this.callID;
    }
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
      console.log(Scratch.Cast.toBoolean(args.OPTION));
      return Scratch.Cast.toBoolean(args.OPTION);
    }
    allReg(args) {
      return "no " + "way"
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
    renamefile(args) {
      return true;
    }
    refile(args) {
      return true;
    }
    makefolder(args) {
      return true;
    }
    moveTo(args) {
      return true;
    }
    currentFolder(args) {
      return "well i would but... i have to toilet"; // placeholder text go brrrrrr
    }
    uploadFileWithType(args) {
      return true;
    }
    uploadFileWithoutType(args) {
      return true;
    }
    uploadFolder(args) {
      return true;
    }
    zipExport(args) {
      return true;
    }
    zipImport(args) {
      return true;
    }
    moveFile(args) {
      return true;
    }
    moveMode(args) {
      return true;
    }

  }
  Scratch.extensions.register(new UnisonKernel());
})(Scratch);
