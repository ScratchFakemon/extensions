// Name: Unison Kernel
// ID: unisonKernel
// Description: An operating system kernel, made into its own extension!
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/> and BambusOS <https://scratch.mit.edu/users/BambusOS/>
// License: MIT <https://opensource.org/license/MIT>
//Documentation: <https://scratchfakemon.github.io/extensions/docs/Fakemon/Unison>

// Above is the TurboWarp extension header. 
// It tells TurboWarp and other TurboWarp-Based Scratch Mods (PenguinMod, Snail-IDE, etc.) things about the extension.
// Please don't modifiy it unless you have to!


(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Unison kernel must be run unsandboxed!");
  }

  const vm = Scratch.vm;
  const semver = "1.0.0-beta";

  class UnisonFileSystem {
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
    _addObjectAbs(path, permissions, folder, content) {}
    _findObjectAbs(path) {
      let splitPath = path.split("/"); // the first index will always be blank
      let files = this._data;
      let dir = "";
      let i = 1;
      let j = 0;
      let k = 0;
      // i'm sorry for subjecting you to this (i didn't want it to use recursion)
      // -BambusOS
      // This is what happens when you look at Bambus's messy code LOL
      // -Scratch_Fakemon :)
      while (!(path === dir || dir.length() > path.length())) {
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
    import() {}
    export() {
      return JSON.jsonify({ ...this.info, content: this._data });
    }
    newFile(path, filename, content) {}
    newDirectory(path, filename) {}
  }

  class UnisonKernel {
    constructor() {
      this.menulogo =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0My40IiBoZWlnaHQ9IjQzLjQiIHZpZXdCb3g9IjAsMCw0My40LDQzLjQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTguMywtMTU4LjMpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTkuMywxODBjMCwtMTEuNDMyMjkgOS4yNjc3MSwtMjAuNyAyMC43LC0yMC43YzExLjQzMjI5LDAgMjAuNyw5LjI2NzcxIDIwLjcsMjAuN2MwLDExLjQzMjI5IC05LjI2NzcxLDIwLjcgLTIwLjcsMjAuN2MtMTEuNDMyMjksMCAtMjAuNywtOS4yNjc3MSAtMjAuNywtMjAuN3oiIGZpbGw9IiNmYTgwMzMiIHN0cm9rZT0iI2UzOTE1ZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDcuNzcxMDEsMTY3LjI5NDE4bC0zLjQyMDgsMjAuMTU4M2MwLDAgLTEuMjUzMDksNC41MjAzNSAtNy41NzQ2Myw0LjUyMDM1Yy01LjI4MzA5LDAgLTUuOTg2NCwtNC41MjAzNSAtNS45ODY0LC00LjUyMDM1bDMuNDIwOCwtMjAuMTU4MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDkuMjM3MDcsMTkyLjcwNTg1YzAsMCAtMS4zNjQ4NywwLjE1MjQgLTMuNjE1ODcsLTEuOTA2NThjLTEuNjQzNDEsLTEuNTAzMiAtMC45MDQ0OCwtNC45MzUwMiAtMC45MDQ0OCwtNC45MzUwMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+";
      this.blocklogo = 
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0MS40IiBoZWlnaHQ9IjQxLjQiIHZpZXdCb3g9IjAsMCw0MS40LDQxLjQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTkuMywtMTU5LjMpIj48ZyBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTkuMywxODBjMCwtMTEuNDMyMjkgOS4yNjc3MSwtMjAuNyAyMC43LC0yMC43YzExLjQzMjI5LDAgMjAuNyw5LjI2NzcxIDIwLjcsMjAuN2MwLDExLjQzMjI5IC05LjI2NzcxLDIwLjcgLTIwLjcsMjAuN2MtMTEuNDMyMjksMCAtMjAuNywtOS4yNjc3MSAtMjAuNywtMjAuN3oiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDcuNzcxMDEsMTY3LjI5NDE4bC0zLjQyMDgsMjAuMTU4M2MwLDAgLTEuMjUzMDksNC41MjAzNSAtNy41NzQ2Myw0LjUyMDM1Yy01LjI4MzA5LDAgLTUuOTg2NCwtNC41MjAzNSAtNS45ODY0LC00LjUyMDM1bDMuNDIwOCwtMjAuMTU4MyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDkuMjM3MDcsMTkyLjcwNTg1YzAsMCAtMS4zNjQ4NywwLjE1MjQgLTMuNjE1ODcsLTEuOTA2NThjLTEuNjQzNDEsLTEuNTAzMiAtMC45MDQ0OCwtNC45MzUwMiAtMC45MDQ0OCwtNC45MzUwMiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjIwLjY5OTk5OTk5OTk5OTk2OjIwLjY5OTk5OTk5OTk5OTk5LS0+";
        this.isInit = false;
      this.osName = "";
      this.fs = undefined;
    }

    getInfo() {
      return {
        id: "unisonKernel",
        name: "Unison",
        menuIconURI: this.menulogo,
        blockIconURI: this.blocklogo,
        color1: "#fa8033",
        color2: "#e3915d",
        color3: "#be5613",
        docsURI: "https://scratchfakemon.github.io/extensions/docs/Fakemon/Unison",

        blocks: [
          {
            opcode: "semver",
            blockType: Scratch.BlockType.REPORTER,
            text: "kernel version",
            disableMonitor: true,
          },
          /*{
            blockType: Scratch.BlockType.LABEL,
            text: "Unison File System",
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: "(There's nothing here yet...)",
          },
          '---'*/
          ,{
            blockType: Scratch.BlockType.LABEL,
            text: "Kernel Initialization",
          },
          {
            opcode: "init",
            blockType: Scratch.BlockType.COMMAND,
            text: "initialize kernel",
          },
          {
            opcode: "whenInit",
            blockType: Scratch.BlockType.EVENT,
            text: "when the kernel initializes",
            isEdgeActivated: false
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: "Operating System Info",
          },

          {
            opcode: "getOsName",
            blockType: Scratch.BlockType.REPORTER,
            text: "OS name",
            disableMonitor: true,
          },
          {
            opcode: "setOsName",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the OS name to [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "os name",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Syscalls",
          },
          {
            opcode: "sendSyscall",
            blockType: Scratch.BlockType.COMMAND,
            text: "send syscall with id [SYSCALL_ID] and data [SYSCALL_DATA]",
            arguments: {
              SYSCALL_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
              SYSCALL_DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "bar",
              },
            },
          },
          {
            opcode: "receiveSyscall",
            blockType: Scratch.BlockType.EVENT,
            text: "when I recieve syscall [SYSCALL_ID]",
            isEdgeActivated: false,
          arguments: {
              SYSCALL_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
            },
          },
          {
            opcode: "SyscallData",
            blockType: Scratch.BlockType.REPORTER,
            text: "recieved syscall data",
          },
        ],
        menus: {
          SYSCALL_IDS: [
            {
              text: "abc",
              value: "def",
            },
          ],
        },
      };
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
    setOsName({ NAME }) {
      this.osName = NAME;
    }
    getOsName() {
      return this.osName;
    }
    sendSyscall({ SYSCALL_ID, SYSCALL_DATA }) {
      vm.runtime.startHats("unisonKernel_receiveSyscalll", {
        ID: SYSCALL_ID,
        DATA: SYSCALL_DATA,
        SENDER: undefined,
      
      
      });
      this.sysData = SYSCALL_DATA
    }
    SyscallData() {
      return this.sysData;
    }
    
    
    
    
    
  }

  Scratch.extensions.register(new UnisonKernel());
// @ts-ignore
})(Scratch);
