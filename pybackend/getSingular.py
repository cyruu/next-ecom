import json



def getSingular(word):
    with open('plurals.txt', 'r',encoding="utf-8") as f:
        pluralsDictionary = json.load(f)
    consonants = "bcdfghjklmnpqrstwxyz"
    vowels = "aeiou"
    word = str(word).lower()
    if len(word) < 2:
        return word
    if word in pluralsDictionary:
        return pluralsDictionary[word]
    if word.endswith('s'):
        if len(word) > 3:
            #Leaves, wives, thieves
            if word.endswith('ves'):
                if len(word[:-3]) > 2:
                    return word.replace('ves','f')
                else:
                    return word.replace('ves','fe')
            #Parties, stories
            if word.endswith('ies'):
                return word.replace('ies','y')
            #Tomatoes, echoes
            if word.endswith('es'):
                if word.endswith('ses') and word[-4] in vowels:
                    return word[:-1]
                if word.endswith('zzes'):
                    return word.replace('zzes','z')
                return word[:-2]
            if word.endswith('ys'):
                return word.replace('ys','y')
            return word[:-1]
    return word
