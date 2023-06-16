const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
const copied_msg = document.querySelector('.copied_msg');

btn.addEventListener('click',async ()=>{

    let [tab] = await chrome.tabs.query({active:true, currentWindow:true}) 

    chrome.scripting.executeScript({
        target: {tabId : tab.id},
        function : pickColor,
    }, async(injectionResults) => {
        const [data] = injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            try {
                await navigator.clipboard.writeText(color) //copy the text to clipboard
                copied_msg.innerText = 'Note: The color code is copied to clipboard!';
            } catch (error) {
                console.error(error);
            }
            
        } 
        console.log()
    });
});

async function  pickColor(){
    console.log('script working');
    try {
        //picker
        const eyeDropper = new EyeDropper();
        const selectedColor = await eyeDropper.open();
        console.log(selectedColor);
        return selectedColor;
    } catch (err) {
        console.error(err);
    }
}