#include <algorithm>
#include <string>
class Solution {
public:
    bool checkValidString(std::string s) {
        int lo = 0, hi = 0; // the fewest and the most "(" that could be open right now // @viz init
        for (char c : s) { // @viz loop
            if (c == '(') { // @viz open
                ++lo; // @viz open
                ++hi; // @viz open
            } else if (c == ')') { // @viz close
                --lo; // @viz close
                --hi; // @viz close
            } else { // "*" could be ")", "" or "(" // @viz star
                --lo; // @viz star
                ++hi; // @viz star
            }
            if (hi < 0) return false; // even treating every "*" as "(" there are too many ")" // @viz fail
            lo = std::max(lo, 0); // a count can't go below 0: drop the choices that would // @viz clamp
        }
        return lo == 0; // some choice closes everything // @viz return
    }
};
