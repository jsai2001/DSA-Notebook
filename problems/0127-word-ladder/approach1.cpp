#include <queue>
#include <string>
#include <unordered_set>
#include <vector>
class Solution {
public:
    int ladderLength(std::string beginWord, std::string endWord, std::vector<std::string>& wordList) {
        std::unordered_set<std::string> unseen(wordList.begin(), wordList.end()); // @viz init
        if (!unseen.count(endWord)) { // @viz init
            return 0; // @viz init
        }
        unseen.erase(beginWord); // @viz init
        std::queue<std::string> q; // @viz init
        q.push(beginWord); // @viz init
        int steps = 1; // words in the ladder so far // @viz init
        while (!q.empty()) { // @viz level
            for (int k = q.size(); k > 0; --k) { // one BFS level = one more word // @viz level
                std::string word = q.front(); // @viz pop
                q.pop(); // @viz pop
                if (word == endWord) { // @viz found
                    return steps; // @viz found
                }
                for (auto it = unseen.begin(); it != unseen.end();) { // compare with every word not used yet // @viz scan
                    if (oneApart(word, *it)) { // @viz scan
                        q.push(*it); // @viz take
                        it = unseen.erase(it); // mark it used when it's queued // @viz take
                    } else {
                        ++it;
                    }
                }
            }
            ++steps; // @viz next
        }
        return 0; // @viz none
    }

private:
    static bool oneApart(const std::string& a, const std::string& b) {
        int diff = 0;
        for (size_t i = 0; i < a.size(); ++i) {
            if (a[i] != b[i] && ++diff > 1) return false;
        }
        return diff == 1;
    }
};
