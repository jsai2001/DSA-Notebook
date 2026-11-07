#include <algorithm>
#include <string>
class Solution {
public:
    int characterReplacement(std::string s, int k) {
        int count[26] = {}; // letters in the window // @viz init
        int lo = 0, top = 0, n = s.size(); // top: the biggest count any letter has reached in a window // @viz init
        for (int hi = 0; hi < n; ++hi) { // @viz grow
            top = std::max(top, ++count[s[hi] - 'A']); // @viz grow
            if (hi - lo + 1 - top > k) --count[s[lo++] - 'A']; // too many to change: slide the window instead of growing it // @viz slide
        }
        return n - lo; // the window never shrinks, so its final size is the best size // @viz return
    }
};
