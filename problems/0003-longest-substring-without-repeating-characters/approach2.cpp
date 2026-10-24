#include <string>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_set<char> window;
        int left = 0, best = 0;
        for (int right = 0; right < s.size(); ++right) {
            while (window.count(s[right])) {
                window.erase(s[left]);
                ++left;
            }
            window.insert(s[right]);
            best = std::max(best, right - left + 1);
        }
        return best;
    }
};
