#include <string>
class Solution {
public:
    bool isMatch(std::string s, std::string p) {
        return match(s, p, 0, 0); // @viz start
    }
private:
    // does s[i..] match p[j..]?
    bool match(const std::string& s, const std::string& p, int i, int j) { // @viz call
        if (j == (int)p.size()) return i == (int)s.size(); // @viz end
        bool first = i < (int)s.size() && (p[j] == s[i] || p[j] == '.'); // @viz first
        if (j + 1 < (int)p.size() && p[j + 1] == '*') { // @viz star
            // skip "x*" (zero copies), or use one copy and stay on "x*"
            return match(s, p, i, j + 2) || (first && match(s, p, i + 1, j)); // @viz star
        }
        return first && match(s, p, i + 1, j + 1); // @viz single
    }
};
