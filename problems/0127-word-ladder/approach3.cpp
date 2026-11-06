#include <string>
#include <unordered_set>
#include <utility>
#include <vector>
class Solution {
public:
    int ladderLength(std::string beginWord, std::string endWord, std::vector<std::string>& wordList) {
        std::unordered_set<std::string> words(wordList.begin(), wordList.end()); // @viz init
        if (!words.count(endWord)) { // without this, the back side would start at a word that isn't allowed // @viz init
            return 0; // @viz init
        }
        std::unordered_set<std::string> front{beginWord}, back{endWord}; // @viz init
        words.erase(beginWord); // @viz init
        words.erase(endWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!front.empty() && !back.empty()) { // @viz loop
            if (front.size() > back.size()) { // always grow the smaller side // @viz swap
                std::swap(front, back); // O(1): swaps the insides // @viz swap
            }
            ++steps; // @viz grow
            std::unordered_set<std::string> grown; // @viz grow
            for (std::string word : front) { // a copy, so letters can change in place // @viz pop
                for (size_t i = 0; i < word.size(); ++i) { // @viz try
                    const char orig = word[i]; // @viz try
                    for (char c = 'a'; c <= 'z'; ++c) { // @viz try
                        word[i] = c; // @viz try
                        if (back.count(word)) { // the two searches meet // @viz meet
                            return steps; // @viz meet
                        }
                        auto it = words.find(word); // @viz take
                        if (it != words.end()) { // @viz take
                            words.erase(it); // @viz take
                            grown.insert(word); // @viz take
                        }
                    }
                    word[i] = orig; // @viz try
                }
            }
            front = std::move(grown); // @viz next
        }
        return 0; // @viz none
    }
};
