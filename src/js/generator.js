// Replaces the tokens in a sentence template with random items from the vocabulary.
function parse_sentence(sentence) {
    var output = '';
    var open_pos, close_pos, token, parts, items;

    while(sentence.length > 0) {
        open_pos = sentence.indexOf('[');

        if(open_pos > -1) {
            output = output + sentence.substr(0,open_pos);

            sentence = sentence.substr(open_pos + 1);

            close_pos = sentence.indexOf(']');
            token = sentence.substr(0,close_pos);

            parts = token.split('-');
            switch(parts[0]) {
                case 'verb':
                    items = vocab.verbs[parts[1]];

                    switch(parts[2]) {
                        case 'root':
                            output = output + items[Math.floor(Math.random() * items.length)][0];
                            break;
                        case 'past':
                            output = output + items[Math.floor(Math.random() * items.length)][1];
                            break;
                        case 'present':
                            output = output + items[Math.floor(Math.random() * items.length)][2];
                            break;
                    }

                    break;
                case 'noun':
                    items = vocab.nouns[parts[1]];
                    output = output + items[Math.floor(Math.random() * items.length)];
                    break;
                case 'simile':
                    items = vocab.similes[parts[1]];
                    output = output + items[Math.floor(Math.random() * items.length)];
                    break;
            }

            sentence = sentence.substr(close_pos + 1);
        } else {
            output = output + sentence;
            sentence = '';
        }
    }

    return output;
}

// Randomly grabs the specified number of sentences and parses them.
function generate(number_of_sentences) {
    var output = '';

    sentences.sort(function() { return 0.5 - Math.random(); });
    var working_set = sentences.slice(0,number_of_sentences);

    for(var i = 0; i < number_of_sentences; i++) {
        output = output + parse_sentence(working_set[i]) + ' ';
    }

    return output.substr(0, output.length - 1);
}

// Replaces the text in the document.
function update_text() {
    document.getElementById('text').innerHTML = generate(5);
}