// Name: Dialogger
// ID: fakemonDialogger
// Description: Displays customizable dialog boxes--much better than the built in ask prompt.
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// License: MPL-2.0
(function (Scratch) {
  "use strict";
  let latestReply = "";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Dialogger needs to be run UNSANDBOXED!");
  }
  function betterBoolean(castable) {
    if (
      castable == "false" ||
      castable == null ||
      castable == undefined ||
      castable == 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  let dialogbody;
  let dialogStyles = {
    backgroundColor: "#050010",
    borderRadius: "0.5em",
    color: "white",
    fontFamily: "Trebuchet MS",
    border: "solid 0px #ffffff00",
    buttonInfo: { borderRadius: "0.5em" },
    confirmInfo: {
      text: "OK",
      backgroundColor: "#67de62",
      color: "white",
      border: "solid 0px #ffffff00",
    },
    cancelInfo: {
      text: "Cancel",
      backgroundColor: "#de6262",
      color: "white",
      border: "solid 0px #ffffff00",
    },
    fadeIn: true,
  };
  Scratch.vm.on("PROJECT_START", () => {
    if (dialogbody) {
      Scratch.renderer.removeOverlay(dialogbody);
    }
  });
  class Dialogger {
    getInfo() {
      return {
        id: "fakemonDialogger",
        name: "Dialogger",
        color1: "#707fb2",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Creating Dialogs",
          },
          {
            opcode: "askandreturn",
            blockType: Scratch.BlockType.REPORTER,
            text: "ask [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          {
            opcode: "askwithoutreturn",
            blockType: Scratch.BlockType.COMMAND,
            text: "ask [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          "---",
          {
            opcode: "alert",
            blockType: Scratch.BlockType.COMMAND,
            text: "alert [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          "---",
          {
            opcode: "confirmandreturn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "confirm [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          {
            opcode: "confirmwithoutreturn",
            blockType: Scratch.BlockType.COMMAND,
            text: "confirm [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          "---",
          {
            opcode: "latestreply",
            blockType: Scratch.BlockType.REPORTER,
            text: "latest reply",
            arguments: {
              //QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Foo" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Styling Dialogs",
          },
          {
            opcode: "setcolor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the [ELEMENT]'s text color to [COLOR]",
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ElementTypes",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "setbackgroundcolor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the [ELEMENT]'s background color to [COLOR]",
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ElementTypes",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#050010",
              },
            },
          },
          {
            opcode: "setborderradius",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] border radius to [RADIUS][UNIT]",
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ElementClasses",
              },
              RADIUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.5",
              },
              UNIT: { type: Scratch.ArgumentType.COLOR, menu: "SizeUnits" },
            },
          },
          {
            opcode: "setborder",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the [ELEMENT]'s border style to [STYLE] [SIZE][UNIT] [COLOR]",
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ElementTypes",
              },
              STYLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BorderStyles",
              },
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
              UNIT: {
                type: Scratch.ArgumentType.COLOR,
                menu: "SizeUnits",
                defaultValue: "px",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "setfontfamily",
            blockType: Scratch.BlockType.COMMAND,
            text: "set dialog font to [FONT]",
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Trebuchet MS",
              },
            },
          },
          {
            opcode: "setbuttontext",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] button's text to [TEXT]",
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ButtonClasses",
              },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "OK" },
            },
          },
          "---",
          {
            opcode: "setfadein",
            blockType: Scratch.BlockType.COMMAND,
            text: "set dialog fade in to [BOOLEAN]",
            arguments: {
              BOOLEAN: { type: Scratch.ArgumentType.STRING, menu: "boolean" },
            },
          },
          "---",
          {
            opcode: "getstylejson",
            blockType: Scratch.BlockType.REPORTER,
            text: "export styles as JSON",
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: JSON.stringify(dialogStyles),
              },
            },
          },
          {
            opcode: "setstylejson",
            blockType: Scratch.BlockType.COMMAND,
            text: "import styles from JSON [JSON]",
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: JSON.stringify(dialogStyles),
              },
            },
          },
        ],
        menus: {
          ElementTypes: {
            acceptReporters: true,
            items: ["body", "confirm button", "cancel button"],
          },
          ElementClasses: {
            acceptReporters: true,
            items: ["the body's", "any buttons'"],
          },
          ButtonClasses: {
            acceptReporters: true,
            items: ["confirm", "cancel"],
          },
          SizeUnits: {
            acceptReporters: true,
            items: ["em", "px"],
          },
          boolean: {
            acceptReporters: true,
            items: ["true", "false"],
          },
          BorderStyles: {
            acceptReporters: true,
            items: [
              "solid",
              "dotted",
              "dashed",
              "double",
              "ridge",
              "groove",
              "inset",
              "outset",
              "none",
              "hidden",
            ],
          },
        },
      };
    }
    async askandreturn(args, util) {
      return (latestReply = new Promise((resolve) => {
        // Create dialog elements
        dialogbody = document.createElement("div");
        dialogbody.style.pointerEvents = "auto";
        dialogbody.style.display = "block";
        dialogbody.style.backgroundColor = dialogStyles.backgroundColor;
        dialogbody.style.padding = "1em";
        dialogbody.style.minWidth = "225px";
        dialogbody.style.borderRadius = dialogStyles.borderRadius;
        dialogbody.style.fontFamily = dialogStyles.fontFamily;
        dialogbody.style.color = dialogStyles.color;
        dialogbody.style.position = "absolute";
        dialogbody.style.left = "50%";
        dialogbody.style.top = "50%";
        dialogbody.style.transform = "translate(-50%, -50%)";
        dialogbody.style.zIndex = "9999";
        dialogbody.style.width = "auto";
        dialogbody.style.border = dialogStyles.border;
        if (dialogStyles.fadeIn) {
          dialogbody.style.transition = "opacity 0.3s ease";
          dialogbody.style.opacity = "0";
          setTimeout(() => (dialogbody.style.opacity = "1"), 10);
        }

        // Label
        dialogbody.innerHTML = `<b>${args.QUERY}</b>`;
        dialogbody.appendChild(document.createElement("br"));

        // Input field
        const dialoginput = document.createElement("input");
        dialoginput.style.margin = "0.5em 0";
        dialogbody.appendChild(dialoginput);
        dialogbody.appendChild(document.createElement("br"));
        dialoginput.style.color = "black";
        dialoginput.style.width = "100%";

        // Buttons
        const dialogbuttons = document.createElement("div");
        dialogbuttons.style.display = "flex";
        dialogbuttons.style.justifyContent = "center";
        dialogbuttons.style.gap = "1em";

        const dialogconfirm = document.createElement("button");
        dialogconfirm.innerText = dialogStyles.confirmInfo.text;
        dialogconfirm.style.color = dialogStyles.confirmInfo.color;
        dialogconfirm.style.backgroundColor =
          dialogStyles.confirmInfo.backgroundColor;
        dialogconfirm.style.borderRadius = dialogStyles.buttonInfo.borderRadius;
        dialogconfirm.style.fontFamily = dialogStyles.fontFamily;
        dialogconfirm.style.border = "solid 0px #ffffff00";
        dialogconfirm.style.padding = "5px";

        const dialogcancel = document.createElement("button");
        dialogcancel.innerText = dialogStyles.cancelInfo.text;
        dialogcancel.style.color = dialogStyles.cancelInfo.color;
        dialogcancel.style.backgroundColor =
          dialogStyles.cancelInfo.backgroundColor;
        dialogcancel.style.borderRadius = dialogStyles.buttonInfo.borderRadius;
        dialogcancel.style.fontFamily = dialogStyles.fontFamily;
        dialogcancel.style.border = "solid 0px #ffffff00";
        dialogcancel.style.padding = "5px";

        dialogconfirm.style.border = dialogStyles.confirmInfo.border;
        dialogcancel.style.border = dialogStyles.cancelInfo.border;

        // ✅ Call resolve when user confirms
        dialogconfirm.onclick = () => {
          latestReply = dialoginput.value;
          Scratch.renderer.removeOverlay(dialogbody);
          resolve(dialoginput.value);
        };

        // ✅ Call resolve with empty string when cancelled
        dialogcancel.onclick = () => {
          latestReply = "";
          Scratch.renderer.removeOverlay(dialogbody);
          console.log("Notice: user cancelled dialog");
          resolve("");
        };

        // ✅ Enter key submits
        document.onkeydown = (key) => {
          if (key.key === "Enter") {
            latestReply = dialoginput.value;
            Scratch.renderer.removeOverlay(dialogbody);
            resolve(dialoginput.value);
          }
          if (key.key === "Escape") {
            Scratch.renderer.removeOverlay(dialogbody);
            resolve("");
          }
        };
        dialogbuttons.appendChild(dialogconfirm);
        dialogbuttons.appendChild(dialogcancel);
        dialogbody.appendChild(dialogbuttons);

        Scratch.renderer.addOverlay(dialogbody);
        dialoginput.focus();
      }));
    }
    async askwithoutreturn(args, util) {
      this.askandreturn(args, util); // haha iLazy
    }

    latestreply() {
      return latestReply;
    }
    setcolor(args) {
      if (args.ELEMENT == "body") {
        dialogStyles.color = args.COLOR;
      } else if (args.ELEMENT == "confirm button") {
        dialogStyles.confirmInfo.color = args.COLOR;
      } else if (args.ELEMENT == "cancel button") {
        dialogStyles.cancelInfo.color = args.COLOR;
      }
    }
    setbackgroundcolor(args) {
      if (args.ELEMENT == "body") {
        dialogStyles.backgroundColor = args.COLOR;
      } else if (args.ELEMENT == "confirm button") {
        dialogStyles.confirmInfo.backgroundColor = args.COLOR;
      } else if (args.ELEMENT == "cancel button") {
        dialogStyles.cancelInfo.backgroundColor = args.COLOR;
      }
    }
    setborderradius(args) {
      if (args.ELEMENT == "the body's") {
        dialogStyles.borderRadius = args.RADIUS + args.UNIT;
      } else if (args.ELEMENT == "any buttons'") {
        dialogStyles.buttonInfo.borderRadius = args.RADIUS + args.UNIT;
      }
    }
    setfontfamily(args) {
      dialogStyles.fontFamily = args.FONT;
    }
    setbuttontext(args) {
      if (args.ELEMENT == "confirm") {
        dialogStyles.confirmInfo.text = args.TEXT;
      } else if (args.ELEMENT == "cancel") {
        dialogStyles.cancelInfo.text = args.TEXT;
      }
    }
    getstylejson(args) {
      return JSON.stringify(dialogStyles);
    }
    setstylejson(args) {
      dialogStyles = JSON.parse(args.JSON);
    }
    async alert(args, util) {
      return new Promise((resolve) => {
        // Create dialog elements
        dialogbody = document.createElement("div");
        dialogbody.style.pointerEvents = "auto";
        dialogbody.style.display = "block";
        dialogbody.style.backgroundColor = dialogStyles.backgroundColor;
        dialogbody.style.padding = "1em";
        dialogbody.style.minWidth = "225px";
        dialogbody.style.borderRadius = dialogStyles.borderRadius;
        dialogbody.style.fontFamily = dialogStyles.fontFamily;
        dialogbody.style.color = dialogStyles.color;
        dialogbody.style.position = "absolute";
        dialogbody.style.left = "50%";
        dialogbody.style.top = "50%";
        dialogbody.style.transform = "translate(-50%, -50%)";
        dialogbody.style.zIndex = "9999";
        dialogbody.style.border = dialogStyles.border;
        if (dialogStyles.fadeIn) {
          dialogbody.style.transition = "opacity 0.3s ease";
          dialogbody.style.opacity = "0";
          setTimeout(() => (dialogbody.style.opacity = "1"), 10);
        }

        // Label
        dialogbody.innerHTML = `<b>${args.QUERY}</b>`;
        dialogbody.appendChild(document.createElement("br"));

        // Buttons
        const dialogbuttons = document.createElement("div");
        dialogbuttons.style.display = "flex";
        dialogbuttons.style.justifyContent = "center";
        dialogbuttons.style.gap = "1em";

        const dialogconfirm = document.createElement("button");
        dialogconfirm.innerText = dialogStyles.confirmInfo.text;
        dialogconfirm.style.color = dialogStyles.confirmInfo.color;
        dialogconfirm.style.backgroundColor =
          dialogStyles.confirmInfo.backgroundColor;
        dialogconfirm.style.borderRadius = dialogStyles.buttonInfo.borderRadius;
        dialogconfirm.style.fontFamily = dialogStyles.fontFamily;
        dialogconfirm.style.border = "solid 0px #ffffff00";
        dialogconfirm.style.padding = "5px";

        dialogconfirm.style.border = dialogStyles.confirmInfo.border;

        // ✅ Call resolve when user confirms
        dialogconfirm.onclick = () => {
          //latestReply = dialoginput.value;
          Scratch.renderer.removeOverlay(dialogbody);
          resolve();
        };

        // ✅ Enter key submits
        document.onkeydown = (key) => {
          if (key.key === "Enter") {
            Scratch.renderer.removeOverlay(dialogbody);
            resolve();
          }
          if (key.key === "Escape") {
            Scratch.renderer.removeOverlay(dialogbody);
            resolve();
          }
        };

        dialogbuttons.appendChild(dialogconfirm);

        dialogbody.appendChild(dialogbuttons);

        Scratch.renderer.addOverlay(dialogbody);
      });
    }
    async confirmandreturn(args, util) {
      return (latestReply = new Promise((resolve) => {
        // Create dialog elements
        dialogbody = document.createElement("div");
        dialogbody.style.pointerEvents = "auto";
        dialogbody.style.display = "block";
        dialogbody.style.backgroundColor = dialogStyles.backgroundColor;
        dialogbody.style.padding = "1em";
        dialogbody.style.minWidth = "225px";
        dialogbody.style.borderRadius = dialogStyles.borderRadius;
        dialogbody.style.fontFamily = dialogStyles.fontFamily;
        dialogbody.style.color = dialogStyles.color;
        dialogbody.style.position = "absolute";
        dialogbody.style.left = "50%";
        dialogbody.style.top = "50%";
        dialogbody.style.transform = "translate(-50%, -50%)";
        dialogbody.style.zIndex = "9999";
        dialogbody.style.border = dialogStyles.border;
        if (dialogStyles.fadeIn) {
          dialogbody.style.transition = "opacity 0.3s ease";
          dialogbody.style.opacity = "0";
          setTimeout(() => (dialogbody.style.opacity = "1"), 10);
        }

        // Label
        dialogbody.innerHTML = `<b>${args.QUERY}</b>`;
        dialogbody.appendChild(document.createElement("br"));

        // Buttons
        const dialogbuttons = document.createElement("div");
        dialogbuttons.style.display = "flex";
        dialogbuttons.style.justifyContent = "center";
        dialogbuttons.style.gap = "1em";

        const dialogconfirm = document.createElement("button");
        dialogconfirm.innerText = dialogStyles.confirmInfo.text;
        dialogconfirm.style.color = dialogStyles.confirmInfo.color;
        dialogconfirm.style.backgroundColor =
          dialogStyles.confirmInfo.backgroundColor;
        dialogconfirm.style.borderRadius = dialogStyles.buttonInfo.borderRadius;
        dialogconfirm.style.fontFamily = dialogStyles.fontFamily;
        dialogconfirm.style.border = "solid 0px #ffffff00";
        dialogconfirm.style.padding = "5px";

        const dialogcancel = document.createElement("button");
        dialogcancel.innerText = dialogStyles.cancelInfo.text;
        dialogcancel.style.color = dialogStyles.cancelInfo.color;
        dialogcancel.style.backgroundColor =
          dialogStyles.cancelInfo.backgroundColor;
        dialogcancel.style.borderRadius = dialogStyles.buttonInfo.borderRadius;
        dialogcancel.style.fontFamily = dialogStyles.fontFamily;
        dialogcancel.style.border = "solid 0px #ffffff00";
        dialogcancel.style.padding = "5px";

        dialogconfirm.style.border = dialogStyles.confirmInfo.border;
        dialogcancel.style.border = dialogStyles.cancelInfo.border;

        // ✅ Call resolve when user confirms
        dialogconfirm.onclick = () => {
          latestReply = true;
          Scratch.renderer.removeOverlay(dialogbody);
          resolve(true);
        };

        // ✅ Call resolve with empty string when cancelled
        dialogcancel.onclick = () => {
          latestReply = false;
          Scratch.renderer.removeOverlay(dialogbody);
          console.log("Notice: user cancelled dialog");
          resolve(false);
        };

        // ✅ Enter key submits
        document.onkeydown = (key) => {
          if (key.key === "Enter") {
            latestReply = true;
            Scratch.renderer.removeOverlay(dialogbody);
            resolve(true);
          }
          if (key.key === "Escape") {
            Scratch.renderer.removeOverlay(dialogbody);
            resolve(false);
          }
        };

        dialogbuttons.appendChild(dialogconfirm);
        dialogbuttons.appendChild(dialogcancel);
        dialogbody.appendChild(dialogbuttons);

        Scratch.renderer.addOverlay(dialogbody);
      }));
    }
    async confirmwithoutreturn(args, util) {
      this.confirmandreturn(args, util);
    }
    setfadein(args) {
      dialogStyles.fadeIn = betterBoolean(args.BOOLEAN);
    }
    setborder(args) {
      let formattedBorder = `${args.STYLE} ${args.SIZE}${args.UNIT} ${args.COLOR}`;
      if (args.ELEMENT == "body") {
        dialogStyles.border = formattedBorder;
      } else if (args.ELEMENT == "confirm button") {
        dialogStyles.confirmInfo.border = formattedBorder;
      } else if (args.ELEMENT == "cancel button") {
        dialogStyles.cancelInfo.border = formattedBorder;
      }
    }
  }
  Scratch.extensions.register(new Dialogger());
})(Scratch);
