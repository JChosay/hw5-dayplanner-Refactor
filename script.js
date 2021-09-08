//declare a whole bunch of global variables
var timeblockIndex = 7;
var container = document.getElementById('container');
var weekday = moment().format('dddd');
var hourNowFull = moment().format('HH');
var hourNow = parseInt(hourNowFull,10);
var rightNow = new Date();
var date = moment().format('MMMM Do YYYY')
var currentDay = document.getElementById('currentDay');
    currentDay.innerHTML = weekday+", "+date;
var timeBlocks = document.getElementsByClassName('form-control');
var buttons = document.getElementsByClassName('btn btn-outline-secondary saveBtn');

//populates the html container with the timeblocks to hold content
function blockPop(){
    for (var i=1; i<15; i++){
        
        var oneDiv = document.createElement('div');
            oneDiv.setAttribute('class','input-group input-group-lg');
        var twoDiv = document.createElement('div');
            twoDiv.setAttribute('class','input-group-prepend');
        var oneSpan = document.createElement('span');
            oneSpan.setAttribute('class','input-group-text');
            oneSpan.setAttribute('id','inputGroup-sizing-lg');

        // Adds the correct time text for each timeblock as the function iterates            
        if (timeblockIndex < 12){
            var timeText = document.createTextNode(timeblockIndex+" AM");
        }else if (timeblockIndex == 12){
            var timeText = document.createTextNode(timeblockIndex+" PM");
        }else if (timeblockIndex == 13){
            var timeText = document.createTextNode("1 PM");
        }else if (timeblockIndex == 14){
            var timeText = document.createTextNode("2 PM");
        }else if (timeblockIndex == 15){
            var timeText = document.createTextNode("3 PM");
        }else if (timeblockIndex == 16){
            var timeText = document.createTextNode("4 PM");
        }else if (timeblockIndex == 17){
            var timeText = document.createTextNode("5 PM");
        }else if (timeblockIndex == 18){
            var timeText = document.createTextNode("6 PM");
        }else if (timeblockIndex == 19){
            var timeText = document.createTextNode("7 PM");
        }else if (timeblockIndex == 20){
            var timeText = document.createTextNode("8 PM");
        }

        var inputText = document.createElement('input');
            inputText.setAttribute('id',timeblockIndex);
            inputText.setAttribute('type','text');
            inputText.setAttribute('class','form-control');
            inputText.setAttribute('aria-label','Large');
            inputText.setAttribute('aria-describedby','inputGroup-sizing-sm');

        var threeDiv = document.createElement('div');
            threeDiv.setAttribute('class','input-group-append');
        
        var saveButtons = document.createElement('button');
            saveButtons.setAttribute('class','btn btn-outline-secondary saveBtn');
            saveButtons.setAttribute('type','button');
            saveButtons.setAttribute('id', timeblockIndex+"block");
   
            //!button click function to save the text in the input field
            saveButtons.addEventListener('click', function(){
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

        var buttonText = document.createTextNode('Save');
            saveButtons.appendChild(buttonText);
        
            oneSpan.appendChild(timeText);
            twoDiv.appendChild(oneSpan);
            oneDiv.appendChild(twoDiv);
            oneDiv.appendChild(inputText);
            threeDiv.appendChild(saveButtons);
            oneDiv.appendChild(threeDiv);
            container.appendChild(oneDiv);

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