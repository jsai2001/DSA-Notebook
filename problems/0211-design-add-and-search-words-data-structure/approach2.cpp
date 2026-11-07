#include <string>
#include <unordered_map>
#include <unordered_set>
class WordDictionary {
public:
    WordDictionary() {} // length -> the set of words with that length // @viz init
    void addWord(std::string word) {
        byLen[word.size()].insert(word); // @viz add
    }
    bool search(std::string word) {
        auto it = byLen.find(word.size()); // only words of the same length can match // @viz group
        if (it == byLen.end()) return false; // @viz group
        if (word.find('.') == std::string::npos) return it->second.count(word) > 0; // no wildcard: one hash lookup // @viz exact
        for (const std::string& w : it->second) { // @viz scan
            size_t i = 0; // @viz scan
            while (i < w.size() && (word[i] == '.' || word[i] == w[i])) ++i; // @viz scan
            if (i == w.size()) return true; // @viz scan
        }
        return false; // @viz scan
    }
private:
    std::unordered_map<size_t, std::unordered_set<std::string>> byLen;
};
