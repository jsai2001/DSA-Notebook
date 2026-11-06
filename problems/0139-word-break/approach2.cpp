#include <string>
#include <vector>
class Solution {
public:
    bool wordBreak(std::string s, std::vector<std::string>& wordDict) {
        this->s = s; // @viz init
        dict = &wordDict; // @viz init
        memo.assign(s.size(), -1); // start -> -1 unknown, 0 no, 1 yes // @viz init
        return can(0); // @viz init
    }

private:
    std::string s;
    const std::vector<std::string>* dict = nullptr;
    std::vector<int> memo;

    bool can(size_t start) {
        if (start == s.size()) return true; // @viz done
        if (memo[start] != -1) return memo[start]; // already worked out: don't redo it // @viz memo
        bool ok = false; // @viz try
        for (const std::string& w : *dict) { // @viz try
            if (s.compare(start, w.size(), w) == 0 && can(start + w.size())) { // @viz try
                ok = true; // @viz found
                break; // @viz found
            }
        }
        memo[start] = ok; // @viz save
        return ok; // @viz save
    }
};
