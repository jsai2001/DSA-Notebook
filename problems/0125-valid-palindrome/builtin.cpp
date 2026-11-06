#include <algorithm>
#include <cctype>
#include <string>
class Solution {
public:
    bool isPalindrome(std::string s) {
        // Drop non-alphanumerics, lowercase the rest, then compare with its reverse.
        s.erase(std::remove_if(s.begin(), s.end(), [](unsigned char c) { return !std::isalnum(c); }), s.end());
        std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c) { return std::tolower(c); });
        return std::equal(s.begin(), s.begin() + s.size() / 2, s.rbegin());
    }
};
