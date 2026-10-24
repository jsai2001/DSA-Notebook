#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::vector<int> last(128, -1); // last index of each ASCII char // @viz init
        int left = 0, best = 0; // @viz init
        for (int right = 0; right < s.size(); ++right) { // @viz loop
            unsigned char c = s[right]; // @viz loop
            if (last[c] >= left) { // @viz check
                left = last[c] + 1; // @viz jump
            }
            last[c] = right; // @viz record
            best = std::max(best, right - left + 1); // @viz record
        }
        return best; // @viz return
    }
};
