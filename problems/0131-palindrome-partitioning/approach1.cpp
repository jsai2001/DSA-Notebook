#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> partition(std::string s) {
        this->s = s; // @viz init
        backtrack(0); // @viz init
        return result; // @viz return
    }

private:
    std::string s;
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> path;

    bool isPal(int lo, int hi) const { // two pointers, every time it's asked // @viz check
        while (lo < hi) { // @viz check
            if (s[lo++] != s[hi--]) return false; // @viz check
        }
        return true; // @viz check
    }

    void backtrack(int start) {
        if (start == static_cast<int>(s.size())) { // every letter is in some piece // @viz done
            result.push_back(path); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        for (int end = start; end < static_cast<int>(s.size()); ++end) { // next piece = s[start..end] // @viz try
            if (isPal(start, end)) { // @viz try
                path.push_back(s.substr(start, end - start + 1)); // choose // @viz choose
                backtrack(end + 1); // explore the rest // @viz choose
                path.pop_back(); // undo // @viz undo
            }
        }
    }
};
