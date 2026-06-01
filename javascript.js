let word = 1;
let letter = 1;
let allowed = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']
// let ans = ['w','a','t','e','r'];
let ans = [];
let Won = false;

fetch('better_words.txt')
    .then(response => response.text())
    .then(text => {
        const words = text
            .split(/\r?\n/)
            .map(word => word.trim().toLowerCase())
        const randomWord = words[Math.floor(Math.random() * words.length)];
        ans = randomWord.split('');
});

function click(event){
    if(Won == true) {
        return;
    }
    console.log(event);
    if(word == 7){
        document.getElementById("title").style.display = 'block';
        document.getElementById("title").innerText = 'You have Lost.';
        console.log("You have lost");
        console.log("Answer:", ans);
        lost();
        return;
    }
    if(event == 'Backspace'){
        if(letter == 1){
            console.log("BAD !");
        }
        else{
            letter -= 1;
        }
        let pos = word*10 + letter;
        pos = String(pos);
        const elem = document.getElementById(pos);
        elem.innerText = '';
        elem.style.borderColor = 'rgb(159, 159, 159)';
        return;
    }
    if(event == 'Enter'){
        console.log(letter);
        // check the words existence (will do later).
        if(letter!=6) {
            return;
        }
        // check word and give output
        let hasWon = true;
        for(let i=1;i<=5;i++){
            let pos = String(word*10 + i);
            let curr_element = document.getElementById(pos);
            let curr_element_text = String(document.getElementById(pos).textContent.toLowerCase());
            // console.log(ans.includes(curr_element));
            if(ans.includes(curr_element_text)){
                if(ans[i-1] == curr_element_text){
                    curr_element.style.background = 'var(--correct)';
                    document.getElementById(curr_element_text.toUpperCase()).style.background = 'var(--correct)'
                    document.getElementById(curr_element_text.toUpperCase()).style.color = 'white'
                }else {
                    curr_element.style.background = 'var(--present)';
                    document.getElementById(curr_element_text.toUpperCase()).style.background = 'var(--present)'
                    document.getElementById(curr_element_text.toUpperCase()).style.color = 'white'
                    hasWon = false;
                }   
            }else {
                curr_element.style.background = 'var(--wrong)';
                document.getElementById(curr_element_text.toUpperCase()).style.background = 'var(--wrong)'
                document.getElementById(curr_element_text.toUpperCase()).style.color = 'white'
                hasWon = false;
            }
            curr_element.style.borderColor = 'rgb(159, 159, 159)';
            curr_element.style.color = 'rgb(255, 255, 255)'
            curr_element.style.fontSize = '40px'
        }

        if(hasWon == true){
            console.log("You have won !");
            // will make the thing pop 
            document.getElementById("title").style.display = 'block';
            document.getElementById("title").innerText = 'You have Won !';
            Won = true;
        }
        letter = 1;
        word += 1;
        return;
    }
    let key = event.toLowerCase();

    if (!allowed.includes(key)) return;
    if(letter > 5){
        console.log("Press Enter");
        return;
    }
    let pos = String(word*10 + letter);
    const elem = document.getElementById(pos);
    elem.innerText = key.toUpperCase();
    elem.style.borderColor = 'rgb(0, 0, 0)';
    letter++;
}

document.querySelectorAll('.lip').forEach(button => {
    button.addEventListener('click', () => {
        if(button.id === 'backspace'){
            click('Backspace');
        }
        else{
            click(button.textContent);
        }
    });
});

document.addEventListener("keydown", (event) => {
    click(event.key);
});

function lost(){

}