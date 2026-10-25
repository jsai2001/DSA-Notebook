#include <string>

class Solution {
public:
    bool isPalin(const std::string& s, int start, int len) {
        for (int a = start, b = start + len - 1; a < b; ++a, --b) {
            if (s[a] != s[b]) return false;
        }
        return true;
    }

    std::string longestPalindrome(std::string s) {
        int n = s.size(); // @viz init
        int bestStart = 0, bestLen = 1; // @viz init
        for (int len = 1; len <= n; ++len) { // @viz length, next
            for (int start = 0; start + len <= n; ++start) { // @viz check
                if (isPalin(s, start, len)) { // @viz check
                    bestStart = start; // @viz found
                    bestLen = len; // @viz found
                    break; // @viz found
                }
            }
        }
        return s.substr(bestStart, bestLen); // @viz return
    }
};
