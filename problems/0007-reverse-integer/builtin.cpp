#include <algorithm>
#include <climits>
#include <cstdlib>
#include <string>
class Solution {
public:
    int reverse(int x) {
        std::string s = std::to_string(std::llabs((long long)x));
        std::reverse(s.begin(), s.end()); // "120" -> "021"
        long long rev = std::stoll(s);    // leading zeros are fine: 21
        if (x < 0) rev = -rev;
        return (rev < INT_MIN || rev > INT_MAX) ? 0 : (int)rev;
    }
};
