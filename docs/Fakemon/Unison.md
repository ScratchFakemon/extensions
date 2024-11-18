# Unison Kernel

Unison is a kernel for Scratch that lets you do a lot of under-the-hood things without having to look through the messy spaghetti code of a normal Scratch kernel.

It's fully baked into the extension, so you don't need to mess with much!

Here are all the blocks and what they do:
## Kernel Initialization

```scratch
initialize kernel :: #fa8033 //Initializes the kernel so it's ready to be used
<is kernel initialized? :: #fa8033>  // Reports whether the kernel is initialized or not
when the kernel initializes :: #fa8033 :: hat //Runs when initialize kernel is run
```

## Operating System Info
```scratch
OS name :: #fa8033 :: reporter // Reports the set OS (operating system) name
set the OS name to [os name] :: #fa8033 // Changes the name that OS name reports
(kernel version :: #fa8033) //Reports the version of Unison being used
```
## File System
### File System blocks will NOT affect your computer's files in any way. If you want to, use the Files extension.
```scratch
create a new file named [Hello.txt] with data [Hello world!] ::#fa8033 // Creates a file with a name and attached data

delete the file named [Hello.txt]::#fa8033 // Deletes the file with the name specified

wipe the file system ::#fa8033 // Deletes ALL files (If triggered by user, you should add a confirmation!)

edit the contents of [Hello.txt] with new data [What's up?] ::#fa8033 // Edits the specified file by replacing its old data with the new data

(open file [hello.txt] ::#fa8033) // Displays the contents of the given file
<file [Hello.txt] exists?::#fa8033> // Returns true if the specified file exists
(file system data ::#fa8033) // The entire file system; good for saving to a real file
```
## Apps
### Note: Apps are reset when the green flag is clicked. They need to be declared each time.
```scratch
(all installed apps ::#fa8033) // Displays the name of every app that has been declared this session
declare an app called [my-app] ::#fa8033 // Declares an app so it can be used
when app [my-app] is declared ::#fa8033 :: hat //Runs when an app is declared
```
## Calls
### Note: Call IDs and data can be in any format

```scratch
send syscall with id [foo] and data [bar] :: #fa8033 // Sends a call with an ID and data
when I recieve syscall with ID [foo] :: #fa8033 :: hat // Runs when a call with the set ID is sent
received call data::#fa8033 :: reporter // Reports the latest data sent in a call
received call id ::#fa8033 :: reporter // Reports the latest ID for a call sent
latest call ::#fa8033 :: reporter // Reports both the latest call ID and Data, joined with a colon (:)
```

## Terminal

```scratch
[show v] the terminal ::#fa8033 // Shows or hides the terminal
<terminal is [shown v]::#fa8033> // Reports whether the terminal is shown or not
(export the terminal ::#fa8033) // Reports every line of the terminal
(line (1) of terminal ::#fa8033) // Reports the specified line of the terminal
[add v] the [hello] command ::#fa8033 // Adds or removes a command with the specified name
<command named [hello] [exists? v] ::#fa8033> // Reports whether a command with the given name exists or not
run command [hello] ::#fa8033 // Runs the specified command without user input
when [hello] is run ::#fa8033 :: hat // Starts when a command is run; a command's function
(all terminal commands ::#fa8033) // Reports every command added to the terminal
set terminal icon to ( v) ::#fa8033 // Sets the icon displayed at the top of the terminal to an image in a 5x5 pixel grid

set terminal icon to (costume 1 v) ::#fa8033 // Sets the icon displayed at the top of the terminal to a costume in the current sprite

set text color to (#ffffff) ::#fa8033 // Sets the color of text in the terminal to any color of your choosing
```
