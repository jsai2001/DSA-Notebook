#include <regex>
#include <string>
class Solution {
public:
    bool isMatch(std::string s, std::string p) {
        // p only uses letters, '.' and '*', which mean the same in real regex.
        return std::regex_match(s, std::regex(p)); // regex_match must cover the whole string
    }
};
