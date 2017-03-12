// Finds a link that says "Next" in the link text and clicks it
javascript:(
    function(){
        anchors=document.getElementsByTagName("A");
        for(i=0;i<anchors.length;i++){
            if(anchors[i].innerHTML.search(/next/i) !== -1){
                anchors[i].click();
            }
        }
    }
)();

// To select all "Next Days" in Berkeley's broken advising appointment website
javascript:(
    function(){
        var nextInterval = setInterval(nextIntervalFunc, 500);
        function nextIntervalFunc() {
            console.log("nexting");
            anchors=document.getElementsByTagName("A");
            for(i=0;i<anchors.length;i++){
                if(anchors[i].innerHTML.search(/next/i) !== -1 && !anchors[i].getAttribute("disabled")){
                    anchors[i].click();
                    return;
                }
            }
            clearInterval(nextInterval);
        }
    }
)();
