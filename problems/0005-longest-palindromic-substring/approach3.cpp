#include <string>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        int n = s.size(), start = 0, best = 1; // @viz init
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < n && s[left] == s[right]) { // @viz step
                --left; // @viz step
                ++right; // @viz step
            }
            if (right - left - 1 > best) { // @viz record
                best = right - left - 1; // @viz record
                start = left + 1; // @viz record
            }
        };
        for (int center = 0; center < n; ++center) { // @viz center
            expand(center, center);      // odd length // @viz center
            expand(center, center + 1);  // even length // @viz center
        }
        return s.substr(start, best); // @viz return
    }
};
