#include <string>
#include <unordered_set>
class Trie {
public:
    Trie() {} // just the words // @viz init
    void insert(std::string word) {
        words.insert(word); // @viz insert
    }
    bool search(std::string word) {
        return words.count(word) > 0; // one hash lookup // @viz search
    }
    bool startsWith(std::string prefix) {
        for (const std::string& w : words) // check every word: slow with many words // @viz prefix
            if (w.compare(0, prefix.size(), prefix) == 0) return true; // @viz prefix
        return false; // @viz prefix
    }
private:
    std::unordered_set<std::string> words;
};
