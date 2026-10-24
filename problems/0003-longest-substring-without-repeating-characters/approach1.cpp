#include <string>
#include <vector>
#include <unordered_set>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        int n = s.size();
        if (n == 0) return 0; // @viz empty
        std::vector<std::vector<int>> tracker(n, std::vector<int>(n, 0)); // @viz init
        int maxSubLen = 1; // @viz init
        for (int j = 0; j < n; ++j) { // @viz outer
            std::unordered_set<char> seen; // @viz outer
            for (int i = j; i < n; ++i) {
                if (seen.count(s[i])) break; // @viz extend, repeat
                tracker[i][j] = (i > 0 ? tracker[i - 1][j] + 1 : 1); // @viz extend
                if (tracker[i][j] > maxSubLen) maxSubLen = tracker[i][j]; // @viz extend
                seen.insert(s[i]); // @viz extend
            }
        }
        return maxSubLen; // @viz return
    }
};
