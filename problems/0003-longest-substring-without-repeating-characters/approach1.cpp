#include <string>
#include <vector>
#include <unordered_set>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        int n = s.size();
        if (n == 0) return 0;
        std::vector<std::vector<int>> tracker(n, std::vector<int>(n, 0));
        int maxSubLen = 1;
        for (int j = 0; j < n; ++j) {
            std::unordered_set<char> seen;
            for (int i = j; i < n; ++i) {
                if (seen.count(s[i])) break;
                tracker[i][j] = (i > 0 ? tracker[i - 1][j] + 1 : 1);
                if (tracker[i][j] > maxSubLen) maxSubLen = tracker[i][j];
                seen.insert(s[i]);
            }
        }
        return maxSubLen;
    }
};
