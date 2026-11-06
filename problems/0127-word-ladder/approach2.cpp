#include <queue>
#include <string>
#include <unordered_set>
#include <vector>
class Solution {
public:
    int ladderLength(std::string beginWord, std::string endWord, std::vector<std::string>& wordList) {
        std::unordered_set<std::string> words(wordList.begin(), wordList.end()); // @viz init
        if (!words.count(endWord)) { // @viz init
            return 0; // @viz init
        }
        words.erase(beginWord); // @viz init
        std::queue<std::string> q; // @viz init
        q.push(beginWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!q.empty()) { // @viz level
            ++steps; // every word found in this level is one more step away // @viz level
            for (int k = q.size(); k > 0; --k) { // @viz level
                std::string word = q.front(); // @viz pop
                q.pop(); // @viz pop
                for (size_t i = 0; i < word.size(); ++i) { // @viz try
                    const char orig = word[i]; // @viz try
                    for (char c = 'a'; c <= 'z'; ++c) { // @viz try
                        word[i] = c; // change one letter (in place, put back below) // @viz try
                        auto it = words.find(word); // @viz hit
                        if (it == words.end()) continue; // not a word, or already used // @viz hit
                        if (word == endWord) { // @viz found
                            return steps; // @viz found
                        }
                        q.push(word); // @viz take
                        words.erase(it); // removing it = marking it used // @viz take
                    }
                    word[i] = orig; // @viz try
                }
            }
        }
        return 0; // @viz none
    }
};
