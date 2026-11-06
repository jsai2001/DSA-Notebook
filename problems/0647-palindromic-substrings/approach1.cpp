#include <string>
class Solution {
public:
    int countSubstrings(std::string s) {
        const int n = s.size(); // @viz init
        int count = 0; // at most n(n + 1) / 2 = 500,500: fits in int // @viz init
        for (int i = 0; i < n; ++i) { // @viz pick
            for (int j = i; j < n; ++j) { // every substring s[i..j] // @viz pick
                int lo = i, hi = j; // @viz check
                while (lo < hi && s[lo] == s[hi]) { // two pointers moving inward // @viz check
                    ++lo; // @viz check
                    --hi; // @viz check
                }
                if (lo >= hi) ++count; // the pointers met: it's a palindrome // @viz count
            }
        }
        return count; // @viz return
    }
};
