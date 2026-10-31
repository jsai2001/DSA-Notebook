#include <string>
#include <vector>
class Solution {
public:
    bool isMatch(std::string s, std::string p) {
        // memo[i][j]: does s[i..] match p[j..]? -1 = not solved yet
        memo.assign(s.size() + 1, std::vector<int>(p.size() + 1, -1)); // @viz init
        return match(s, p, 0, 0); // @viz return
    }
private:
    std::vector<std::vector<int>> memo;
    bool match(const std::string& s, const std::string& p, int i, int j) { // @viz call
        if (memo[i][j] != -1) return memo[i][j]; // @viz hit
        bool ans;
        if (j == (int)p.size()) { // @viz end
            ans = i == (int)s.size(); // @viz end
        } else {
            bool first = i < (int)s.size() && (p[j] == s[i] || p[j] == '.'); // @viz first
            if (j + 1 < (int)p.size() && p[j + 1] == '*') { // @viz star
                ans = match(s, p, i, j + 2) || (first && match(s, p, i + 1, j)); // @viz star
            } else {
                ans = first && match(s, p, i + 1, j + 1); // @viz single
            }
        }
        memo[i][j] = ans; // @viz store
        return ans; // @viz store
    }
};
