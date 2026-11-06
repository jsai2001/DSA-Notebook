#include <cctype>
#include <string>
class Solution {
public:
    bool isPalindrome(std::string s) {
        std::string cleaned; // @viz clean
        for (unsigned char c : s) // @viz clean
            if (std::isalnum(c)) cleaned += static_cast<char>(std::tolower(c)); // @viz clean
        int i = 0, j = static_cast<int>(cleaned.size()) - 1; // @viz init
        while (i < j) { // @viz loop
            if (cleaned[i] != cleaned[j]) { // @viz compare
                return false; // @viz false
            }
            ++i; // @viz move
            --j; // @viz move
        }
        return true; // @viz true
    }
};
