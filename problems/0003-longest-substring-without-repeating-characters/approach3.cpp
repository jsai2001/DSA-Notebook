#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::vector<int> last(128, -1); // last index of each ASCII char
        int left = 0, best = 0;
        for (int right = 0; right < s.size(); ++right) {
            unsigned char c = s[right];
            if (last[c] >= left) {
                left = last[c] + 1;
            }
            last[c] = right;
            best = std::max(best, right - left + 1);
        }
        return best;
    }
};
