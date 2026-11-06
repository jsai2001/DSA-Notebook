#include <string>
#include <vector>
class Solution {
public:
    bool wordBreak(std::string s, std::vector<std::string>& wordDict) {
        this->s = s; // @viz init
        dict = &wordDict; // @viz init
        return can(0); // @viz init
    }

private:
    std::string s;
    const std::vector<std::string>* dict = nullptr;

    bool can(size_t start) { // can s[start:] be split into words?
        if (start == s.size()) return true; // nothing left: the split worked // @viz done
        for (const std::string& w : *dict) { // @viz try
            if (s.compare(start, w.size(), w) == 0 && can(start + w.size())) { // w fits here, and the rest splits // @viz try
                return true; // @viz found
            }
        }
        return false; // no word works from here // @viz fail
    }
};
