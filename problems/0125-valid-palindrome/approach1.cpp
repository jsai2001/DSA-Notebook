#include <algorithm>
#include <cctype>
#include <string>
class Solution {
public:
    bool isPalindrome(std::string s) {
        std::string cleaned; // @viz init
        cleaned.reserve(s.size()); // @viz init
        for (unsigned char c : s) { // unsigned: isalnum needs 0..255 // @viz loop
            if (std::isalnum(c)) { // letters and digits only // @viz check
                cleaned += static_cast<char>(std::tolower(c)); // @viz keep
            }
        }
        std::string reversed(cleaned.rbegin(), cleaned.rend()); // @viz join
        return cleaned == reversed; // reads the same backwards? // @viz compare
    }
};
