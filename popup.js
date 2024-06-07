const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
const copied_msg = document.querySelector('.copied_msg');
const copyBtn = document.querySelector('.copy-color-code-btn');


// Function to pick color from the webpage
async function pickColor() {
    console.log('Function called');
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    btn.innerText = 'Picking...';
    return result;
}


// btn.addEventListener('click',async ()=>{
//     console.log('Button clicked');
//     let [tab] = await chrome.tabs.query({active:true, currentWindow:true}) 

//     // Check if the URL can be injected
//     if (!tab.url.startsWith('http://') && !tab.url.startsWith('https://')) {
//         console.error('Cannot inject script into the current tab');
//         return;
//     }

//     console.log(tab);

//     try{

//         const injectionResults = await chrome.scripting.executeScript({
//             target: {tabId: tab.id},
//             func: pickColor,
//         });
//         const [data] = injectionResults;
//         console.log(injectionResults);

//         console.log(data);
//         if(data.result){
//             const color = data.result.sRGBHex;
//             colorGrid.style.backgroundColor = color;
//             colorValue.innerText = color;
            
//             //copy to clipboard
//             try {
//                 await navigator.clipboard.writeText(color) //copy the text to clipboard
//                 copied_msg.innerText = 'Note: The color code is copied to clipboard!';
//             } catch (error) {
//                 console.error(error);
//             }
            
//         }else{
//             console.error('No color picked');
//         }
//         // chrome.scripting.executeScript({
//         //     target: {tabId : tab.id},
//         //     function : pickColor,
//         // }, async(injectionResults) => {
//         //     const [data] = injectionResults;
//         //     console.log(data);
            
//         // });
//     }
//     catch(err){
//         console.error(err);
//   }
// });


btn.addEventListener('click', async () => {
    console.log('Button clicked');

    try {
        btn.innerText = 'Picking...';
        const result = await pickColor();
        btn.innerText = 'Pick Another Color';
        console.log(result);

        if (result) {
            const color = result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            
            //copy to clipboard
            // try {
            //     await navigator.clipboard.writeText(color) //copy the text to clipboard
            //     copied_msg.innerText = 'Note: The color code is copied to clipboard!';
            // } catch (error) {
            //     console.error(error);
            // }
        }else{
            console.log('No color picked');
        }
    } catch (error) {
        console.error('Failed to pick color:', error);
    }
});

copyBtn.addEventListener('click', async () => {
    const color = colorValue.innerText;
    try {
        await navigator.clipboard.writeText(color) //copy the text to clipboard
        copied_msg.innerText = 'Note: The color code is copied to clipboard!';
    } catch (error) {
        console.error(error);
    }
});
