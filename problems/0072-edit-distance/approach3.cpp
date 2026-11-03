#include <algorithm>
#include <numeric>
#include <string>
#include <utility>
#include <vector>
class Solution {
public:
    int minDistance(std::string word1, std::string word2) {
        if (word1.size() < word2.size()) std::swap(word1, word2); // the distance is the same both ways; keep the row short // @viz init
        int n = (int)word2.size(); // @viz init
        std::vector<int> row(n + 1); // @viz init
        std::iota(row.begin(), row.end(), 0); // row[j] = dp[0][j] = j: build word2[:j] from "" // @viz init
        for (int i = 1; i <= (int)word1.size(); ++i) { // turn row into dp[i][...] // @viz row
            int diag = row[0]; // dp[i - 1][j - 1], saved before it's overwritten // @viz row
            row[0] = i; // dp[i][0] = i // @viz row
            for (int j = 1; j <= n; ++j) { // @viz cell
                int above = row[j]; // still dp[i - 1][j] // @viz cell
                if (word1[i - 1] == word2[j - 1]) row[j] = diag; // @viz cell
                else row[j] = 1 + std::min({diag, above, row[j - 1]}); // row[j - 1] is already dp[i][j - 1] // @viz cell
                diag = above; // the next cell's diagonal // @viz cell
            }
        }
        return row[n]; // @viz answer
    }
};
