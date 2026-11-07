#include <algorithm>
#include <string>
class Solution {
public:
    int characterReplacement(std::string s, int k) {
        int best = 0, n = s.size(); // @viz init
        bool present[26] = {}; // @viz init
        for (char ch : s) present[ch - 'A'] = true; // @viz init
        for (int c = 0; c < 26; ++c) { // guess which letter the run is made of // @viz letter
            if (!present[c]) continue; // @viz letter
            int lo = 0, other = 0; // other: letters in the window that aren't c // @viz letter
            for (int hi = 0; hi < n; ++hi) { // @viz grow
                other += s[hi] - 'A' != c; // @viz grow
                while (other > k) other -= s[lo++] - 'A' != c; // too many to change: shrink from the left // @viz shrink
                best = std::max(best, hi - lo + 1); // @viz best
            }
        }
        return best; // @viz return
    }
};
