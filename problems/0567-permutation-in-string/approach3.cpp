#include <algorithm>
#include <array>
#include <string>
class Solution {
public:
    bool checkInclusion(std::string s1, std::string s2) {
        int m = (int)s1.size(), n = (int)s2.size(); // @viz init
        if (m > n) return false; // @viz init
        std::array<int, 26> diff{}; // diff[c] = count of c in the window - count of c in s1 // @viz init
        for (int i = 0; i < m; ++i) { // @viz init
            --diff[s1[i] - 'a']; // @viz init
            ++diff[s2[i] - 'a']; // @viz init
        }
        int zeros = (int)std::count(diff.begin(), diff.end(), 0); // how many letters already agree // @viz init
        for (int i = m; i < n; ++i) { // @viz slide
            if (zeros == 26) { // every letter agrees: a permutation of s1 // @viz check
                return true; // @viz found
            }
            int c = s2[i] - 'a'; // s2[i] comes in // @viz add
            if (diff[c] == 0) --zeros; // it agreed before; it won't after // @viz add
            if (++diff[c] == 0) ++zeros; // now it agrees // @viz add
            c = s2[i - m] - 'a'; // s2[i - m] goes out // @viz drop
            if (diff[c] == 0) --zeros; // @viz drop
            if (--diff[c] == 0) ++zeros; // @viz drop
        }
        return zeros == 26; // the last window hasn't been checked yet // @viz return
    }
};
