#include <array>
#include <string>
class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        std::array<int, 128> need{}; // @viz init
        for (char c : t) ++need[c]; // @viz init
        int m = (int)s.size(), n = (int)t.size(); // @viz init
        int bestStart = 0, bestLen = m + 1; // no window yet // @viz init
        for (int i = 0; i < m; ++i) { // @viz start
            std::array<int, 128> have{}; // @viz start
            int missing = n; // letters of t not yet in s[i..j] // @viz start
            for (int j = i; j < m; ++j) { // @viz grow
                char c = s[j]; // @viz grow
                if (++have[c] <= need[c]) --missing; // one more letter of t is covered // @viz grow
                if (missing == 0) { // s[i..j] covers t // @viz found
                    if (j - i + 1 < bestLen) { // @viz record
                        bestStart = i; // @viz record
                        bestLen = j - i + 1; // @viz record
                    }
                    break; // a longer window from i can't be shorter // @viz found
                }
            }
        }
        return bestLen <= m ? s.substr(bestStart, bestLen) : ""; // @viz return
    }
};
