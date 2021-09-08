# hw5-dayplanner

A simple application that provides a timeblock for each hour of the workday. The REAL workday, 'Murica-style: 7 am to 8 pm.

Each hour has a label for the time, an input field, and a 'save' button. Users can type in a new task and save that task to local storage, so that user values are retained.

The code begins by declaring several global variables and then calling the function 'blockPop.' BlockPop is a large for... loop, iterating from 1 to 14 (for each hour between 7 am and 8 pm). First, the correct time is assigned to each timeblock hour label by passing the variable timeblockTindex through an if/elseif loop. 

Then, the loop builds a number of screen elements. When it gets to the button part of a timeblock, a function is called to add the user input text to local storage with a key of memoryStamp (date, message, time). After this, the function appends the built timeblocks to the container.

Next, the function iterates through the timeblocks and assigns a background color to each one based on its relation to the current time - with blocks in hours already passed showing up in grey, those in the future in green, and the present one in red. THis is done by comparing an hour value in each timeblock against a current hour value.

Finally, the function queries local storage; if it is empty, the function is completed and the application is ready for use. If it is not empty, a last function called loadTasks is called. This simply iterates through the items in local storage and adds the "message" value to the input area of the apropriate timeblock.