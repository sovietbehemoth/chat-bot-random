let WORD_STACK = [];
let WORD_PROM = [];
let WORD_CONTEXT = [];
//get rid of uppercase letters and characters not in latin alphabet
function cleanup(word_f) {
    if (word_f === undefined) return "";
    let f_word;
    let word = word_f;
    word = word.toLowerCase();
    let wordar = word.split("");
    let wordf = [];
    for (let i = 0; i < word.split("").length; i++) {
        switch (wordar[i]) {
            case "a": wordf.push("a"); break;
            case "b": wordf.push("b"); break;
            case "c": wordf.push("c"); break;
            case "d": wordf.push("d"); break;
            case "e": wordf.push("e"); break;
            case "f": wordf.push("f"); break;
            case "g": wordf.push("g"); break;
            case "h": wordf.push("h"); break;
            case "i": wordf.push("i"); break;
            case "j": wordf.push("j"); break;
            case "k": wordf.push("k"); break;
            case "l": wordf.push("l"); break;
            case "m": wordf.push("m"); break;
            case "n": wordf.push("n"); break;
            case "o": wordf.push("o"); break;
            case "p": wordf.push("p"); break;
            case "q": wordf.push("q"); break;
            case "r": wordf.push("r"); break;
            case "s": wordf.push("s"); break;
            case "t": wordf.push("t"); break;
            case "u": wordf.push("u"); break;
            case "v": wordf.push("v"); break;
            case "w": wordf.push("w"); break;
            case "x": wordf.push("x"); break;
            case "y": wordf.push("y"); break;
            case "z": wordf.push("z"); break;
        }
        f_word = wordf.join("");
    }
    return f_word;
}
//push all data to respective stacks
function start_learning(content) {
    for (let i = 0; i < content.length; i++) {
        for (let i2 = 0; i2 < content[i].split(" ").length; i2++) {
            let statement = content[i].split(" ");
            let word = cleanup(statement[i2]);
            if (!WORD_STACK.includes(word)) {
                WORD_STACK.push(word);
                WORD_PROM[WORD_STACK.indexOf(word)] = 1;
                let formatted_context = content[i].split(" ");
                let statement_push = [];
                for (let i3 = 0; i3 < formatted_context.length; i3++) {
                    statement_push.push(cleanup(formatted_context[i3]));
                } WORD_CONTEXT.push([statement_push]);
            } else {
                WORD_PROM[WORD_STACK.indexOf(word)] = WORD_PROM[WORD_STACK.indexOf(word)] + 1;
                let formatted_context = content[i].split(" ");
                let statement_push = [];
                for (let i3 = 0; i3 < formatted_context.length; i3++) {
                    statement_push.push(cleanup(formatted_context[i3]));
                } WORD_CONTEXT.push([statement_push]);
                WORD_CONTEXT[WORD_STACK.indexOf(word)].push(content[i].split(" "));
            }
        }
    }
}
//generate semi-random selective response
function generate_response(content) {
    let response = [];
    for (let i = 0; i < content.length; i++) {
        let target = cleanup(content[i]);
        let random_1 = Math.floor((Math.random() * WORD_CONTEXT[WORD_STACK.indexOf(target)].length) + 0);
        let random_2 = Math.floor((Math.random() * WORD_CONTEXT[WORD_STACK.indexOf(target)][random_1].length) + 1)
        let word = WORD_CONTEXT[WORD_STACK.indexOf(target)][random_1][random_2];
        response.push(word);
    }
    return response.join(" ");
}

export { start_learning };
export { generate_response };
export { cleanup };
export { WORD_STACK };
export { WORD_CONTEXT };
export { WORD_PROM }; 
