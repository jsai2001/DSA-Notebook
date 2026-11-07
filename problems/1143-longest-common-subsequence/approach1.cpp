#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    int longestCommonSubsequence(std::string text1, std::string text2) {
        a = text1; // @viz init
        b = text2; // @viz init
        memo.assign(a.size(), std::vector<int>(b.size(), -1)); // remember lcs(i, j) for each pair (-1 = not yet) // @viz init
        return lcs(0, 0); // @viz return
    }
private:
    std::string a, b;
    std::vector<std::vector<int>> memo;
    int lcs(int i, int j) { // LCS of a[i:] and b[j:] // @viz call
        if (i == (int)a.size() || j == (int)b.size()) return 0; // one of them is used up // @viz base
        int& m = memo[i][j]; // @viz call
        if (m >= 0) return m; // @viz call
        if (a[i] == b[j]) return m = 1 + lcs(i + 1, j + 1); // same letter: take it, move on in both // @viz same
        return m = std::max(lcs(i + 1, j), lcs(i, j + 1)); // different: drop one letter from either side // @viz diff
    }
};
