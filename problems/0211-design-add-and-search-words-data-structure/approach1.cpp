#include <string>
#include <vector>
class WordDictionary {
public:
    WordDictionary() {} // @viz init
    void addWord(std::string word) {
        words.push_back(word); // @viz add
    }
    bool search(std::string word) {
        for (const std::string& w : words) { // try every word // @viz scan
            if (w.size() != word.size()) continue; // @viz scan
            size_t i = 0; // @viz scan
            while (i < w.size() && (word[i] == '.' || word[i] == w[i])) ++i; // "." matches any letter // @viz scan
            if (i == w.size()) return true; // @viz found
        }
        return false; // @viz none
    }
private:
    std::vector<std::string> words;
};
