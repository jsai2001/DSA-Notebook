#include <algorithm>
#include <string>
class Solution {
public:
    bool checkInclusion(std::string s1, std::string s2) {
        int m = (int)s1.size(); // @viz init
        std::string target = s1; // @viz init
        std::sort(target.begin(), target.end()); // every permutation of s1 sorts to the same letters // @viz init
        for (int i = 0; i + m <= (int)s2.size(); ++i) { // every window of length m // @viz window
            std::string window = s2.substr(i, m); // @viz window
            std::sort(window.begin(), window.end()); // @viz window
            if (window == target) return true; // @viz found
        }
        return false; // @viz return
    }
};
