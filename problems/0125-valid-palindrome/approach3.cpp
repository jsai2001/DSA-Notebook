#include <cctype>
#include <string>
class Solution {
public:
    bool isPalindrome(std::string s) {
        int i = 0, j = static_cast<int>(s.size()) - 1; // @viz init
        // unsigned char: isalnum / tolower need 0..255
        auto at = [&](int k) { return static_cast<unsigned char>(s[k]); };
        while (i < j) { // @viz loop
            while (i < j && !std::isalnum(at(i))) ++i; // skip from the left // @viz skipleft
            while (i < j && !std::isalnum(at(j))) --j; // skip from the right // @viz skipright
            if (std::tolower(at(i)) != std::tolower(at(j))) { // @viz compare
                return false; // @viz false
            }
            ++i; // @viz move
            --j; // @viz move
        }
        return true; // @viz true
    }
};
