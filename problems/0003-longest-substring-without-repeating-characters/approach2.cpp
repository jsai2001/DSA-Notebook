#include <string>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_set<char> window; // @viz init
        int left = 0, best = 0; // @viz init
        for (int right = 0; right < s.size(); ++right) { // @viz loop
            while (window.count(s[right])) { // @viz dup
                window.erase(s[left]); // @viz shrink
                ++left; // @viz shrink
            }
            window.insert(s[right]); // @viz add
            best = std::max(best, right - left + 1); // @viz add
        }
        return best; // @viz return
    }
};
