# Unison Kernel
## THIS DOCUMENTATION IS UNFINISHED!

Unison is a kernel for Scratch that lets you do a lot of under-the-hood things without having to look through the messy spaghetti code of a normal Scratch kernel.

It's fully baked into the extension, so you don't need to mess with much!

Here are all the blocks and what they do:
## Kernel Initialization

```scratch
initialize kernel :: #fa8033 //Initializes the kernel so it's ready to be used
when the kernel initializes :: #fa8033 :: hat //Runs when initialize kernel is run
```

## Operating System Info
```scratch
OS name :: #fa8033 :: reporter // Reports the set OS (operating system) name
set the OS name to [os name] :: #fa8033 // Changes the name that OS name reports
(kernel version :: #fa8033) //Reports the version of Unison being used
```

## Syscalls
#### Note: Syscall (System Call) IDs and data can be in any format

```scratch
send syscall with id [foo] and data [bar] :: #fa8033 // Sends a syscall with an ID and data
when I recieve syscall with ID [foo] :: #fa8033 :: hat // Runs when a syscall with a set ID is sent
```
