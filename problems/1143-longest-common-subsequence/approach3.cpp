#include <algorithm>
#include <string>
#include <utility>
#include <vector>
class Solution {
public:
    int longestCommonSubsequence(std::string text1, std::string text2) {
        if (text2.size() > text1.size()) std::swap(text1, text2); // keep the shorter text as the row // @viz init
        const int n = text2.size(); // @viz init
        std::vector<int> prev(n + 1, 0), cur(n + 1, 0); // two rows of the table // @viz init
        for (char a : text1) { // @viz row
            for (int j = 1; j <= n; ++j) // @viz cell
                cur[j] = a == text2[j - 1] ? prev[j - 1] + 1 : std::max(prev[j], cur[j - 1]); // diagonal + 1, or the best of up and left // @viz same, diff
            std::swap(prev, cur); // only one row is ever needed // @viz row
        }
        return prev[n]; // @viz return
    }
};
