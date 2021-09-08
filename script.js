//declare a whole bunch of global variables
var timeblockIndex = 7;
var container = $('#container');
var weekday = moment().format('dddd');
var hourNowFull = moment().format('HH');
var hourNow = parseInt(hourNowFull,10);
var rightNow = new Date();
var date = moment().format('MMMM Do YYYY')
var currentDay = $('#currentDay');
    currentDay.text( weekday + ", " + date );
var timeBlocks = document.getElementsByClassName('form-control');
var buttons = document.getElementsByClassName('btn btn-outline-secondary saveBtn');

function blockPop(){
    for (var i=1; i<15; i++){
        
        var oneDiv = $('<div>');
            oneDiv.attr('class','input-group input-group-lg');
        
        var twoDiv = $('<div>');
            twoDiv.attr('class','input-group-prepend');
        
        var oneSpan = $('<span>');
            oneSpan.attr('class','input-group-text');
            oneSpan.attr('id','inputGroup-sizing-lg');

        //! Adds the correct time text for each timeblock as the function iterates            
        if (timeblockIndex < 12){
            var timeText = timeblockIndex+" AM";
        }else if (timeblockIndex == 12){
            var timeText = timeblockIndex+" PM";
        }else if (timeblockIndex == 13){
            var timeText = "1 PM";
        }else if (timeblockIndex == 14){
            var timeText = "2 PM";
        }else if (timeblockIndex == 15){
            var timeText = "3 PM";
        }else if (timeblockIndex == 16){
            var timeText = "4 PM";
        }else if (timeblockIndex == 17){
            var timeText = "5 PM";
        }else if (timeblockIndex == 18){
            var timeText = "6 PM";
        }else if (timeblockIndex == 19){
            var timeText = "7 PM";
        }else if (timeblockIndex == 20){
            var timeText = "8 PM";
        }

        var inputText = $('<input>');
            inputText.attr('id', timeblockIndex);
            inputText.attr('type','text');
            inputText.attr('class','form-control');
            inputText.attr('aria-label','Large');
            inputText.attr('aria-describedby','inputGroup-sizing-sm');

        var threeDiv = $('<div>');
            threeDiv.attr('class','input-group-append');
        
        var saveButtons = $('<button>');
            saveButtons.attr('class','btn btn-outline-secondary saveBtn');
            saveButtons.attr('type','button');
            saveButtons.attr('id', timeblockIndex+"block");
   
        //!button click function to save the text in the input field
        saveButtons.on("click", function(){
            var slotIndex = parseInt(this.id,10);
            var slotContent = document.getElementById(slotIndex);
            var slotContentText = slotContent.value;

            var memoryStamp = JSON.parse(localStorage.getItem("memoryStamp"));
                
            if(memoryStamp===null){
                memoryStamp = [
                    {
                    date: rightNow,
                    time: slotIndex,
                    message: slotContentText
                    }
                ]
                window.localStorage.setItem('memoryStamp',JSON.stringify(memoryStamp));
            }else{
                var newTask = [
                    {
                    date: rightNow,
                    time: slotIndex,
                    message: slotContentText
                    }
                ]
                var memoryStorage = JSON.parse(localStorage.getItem('memoryStamp'));
                memoryStamp = memoryStorage.concat(newTask);
                localStorage.setItem('memoryStamp',JSON.stringify(memoryStamp));
            }
        })
        //!   end button click event code...

        saveButtons.text('Save');
        oneSpan.append(timeText);
        twoDiv.append(oneSpan);
        oneDiv.append(twoDiv);
        oneDiv.append(inputText);
        threeDiv.append(saveButtons);
        oneDiv.append(threeDiv);
        container.append(oneDiv);

        timeblockIndex ++
    }
    for (var i=0; i<timeBlocks.length; i++){
    
        if (timeBlocks[i].id > hourNow){
            var grabbit = document.getElementById(timeBlocks[i].id);
                grabbit.style.backgroundColor = "green";
        }else if (timeBlocks[i].id < hourNow){
            var grabbit = document.getElementById(timeBlocks[i].id);
                grabbit.style.backgroundColor = "grey";
        }else{
            var grabbit = document.getElementById(timeBlocks[i].id);
                grabbit.style.backgroundColor = "red";
        }
    }
    console.log(timeBlocks);
    console.log(timeBlocks.length);
    var memoryStorage = JSON.parse(localStorage.getItem('memoryStamp'));
    //finally, once everything has loaded, calls loadTasks if there is content in Local Storage.
    if (memoryStorage!=null){
        loadTasks();
    }
}

blockPop();

//function to load messages freom local Storage into the appropriate input field.
function loadTasks(){
    var memoryStorage = JSON.parse(localStorage.getItem('memoryStamp'));
    for(var i=0; i<memoryStorage.length; i++){
        var message = memoryStorage[i].message;
        var hour = memoryStorage[i].time;
        var preloadBlock = document.getElementById(hour);
        preloadBlock.value = message;
    }
}