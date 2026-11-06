#include <string>
class Solution {
public:
    int numDecodings(std::string s) {
        str = s; // @viz answer
        return ways(0); // @viz answer
    }
private:
    std::string str;
    int ways(size_t i) { // how many ways to decode s[i..] // @viz call
        if (i == str.size()) return 1; // nothing left: one way (decode nothing) // @viz base
        if (str[i] == '0') return 0; // no letter's code starts with 0 // @viz zero
        int total = ways(i + 1); // s[i] alone is a letter (1-9) // @viz one
        if (i + 1 < str.size()) { // @viz two
            int two = (str[i] - '0') * 10 + (str[i + 1] - '0'); // @viz two
            if (two >= 10 && two <= 26) total += ways(i + 2); // s[i..i+1] is a letter too (10-26) // @viz two
        }
        return total; // @viz sum
    }
};
