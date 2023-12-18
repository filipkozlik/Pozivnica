function write_text(destination, text_to_write, line_index, letter_index) {
    var line_previous = ' ';
    var line_iter = 0;
    while (line_iter < line_index) {
        line_previous += text_to_write[line_iter++] + '<br />';
    }
    var line_current = text_to_write[line_index].substring(0, letter_index);
    destination.innerHTML = line_previous + line_current;
    if (line_index < text_to_write.length - 1 || letter_index < text_to_write[line_index].length - 1) {
        destination.innerHTML += "_";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typewriter(text_to_write, element_id) {
    var letter_delay = 100;
    var line_delay = 400;
    var destination = document.getElementById(element_id);

    var line_index = 0;
    while (line_index < text_to_write.length) {
        var letter_index = 0;
        while (letter_index <= text_to_write[line_index].length) {
        write_text(destination, text_to_write, line_index, letter_index);
        letter_index++;
        await sleep(letter_delay);
        }
        await sleep(line_delay);
        line_index++;
    }
}