#include <set>
#include <string>
#include <unordered_set>
#include <vector>
class Solution {
public:
    bool wordBreak(std::string s, std::vector<std::string>& wordDict) {
        const int n = s.size(); // @viz init
        std::unordered_set<std::string> words(wordDict.begin(), wordDict.end()); // @viz init
        std::set<int> lengths; // at most 20 different lengths, in order // @viz init
        for (const auto& w : wordDict) lengths.insert(w.size()); // @viz init
        std::vector<char> dp(n + 1, 0); // dp[i]: can the first i letters be split? // @viz init
        dp[0] = 1; // the empty prefix: zero words // @viz init
        for (int i = 1; i <= n; ++i) { // @viz end
            for (int L : lengths) { // the last word is s[i-L:i] // @viz try
                if (L > i) break; // @viz try
                if (dp[i - L] && words.count(s.substr(i - L, L))) { // @viz hit
                    dp[i] = 1; // @viz hit
                    break; // @viz hit
                }
            }
        }
        return dp[n]; // @viz return
    }
};
