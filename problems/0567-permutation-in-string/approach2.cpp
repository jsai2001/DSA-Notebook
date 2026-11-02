#include <array>
#include <string>
class Solution {
public:
    bool checkInclusion(std::string s1, std::string s2) {
        int m = (int)s1.size(), n = (int)s2.size(); // @viz init
        if (m > n) return false; // no window is long enough // @viz init
        std::array<int, 26> need{}, have{}; // letter counts of s1 and of the current window // @viz init
        for (int i = 0; i < m; ++i) { // the first window is s2[0..m-1] // @viz init
            ++need[s1[i] - 'a']; // @viz init
            ++have[s2[i] - 'a']; // @viz init
        }
        for (int i = m; i < n; ++i) { // @viz slide
            if (have == need) { // same counts: this window is a permutation of s1 // @viz check
                return true; // @viz found
            }
            ++have[s2[i] - 'a']; // slide right: s2[i] comes in // @viz slide
            --have[s2[i - m] - 'a']; // and s2[i - m] goes out // @viz slide
        }
        return have == need; // the last window hasn't been checked yet // @viz return
    }
};
