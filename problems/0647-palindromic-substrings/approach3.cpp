#include <string>
class Solution {
public:
    int countSubstrings(std::string s) {
        const int n = s.size(); // @viz init
        int count = 0; // @viz init
        for (int center = 0; center < 2 * n - 1; ++center) { // n letters + n - 1 gaps between them // @viz center
            int lo = center / 2; // @viz center
            int hi = lo + center % 2; // odd center: lo == hi (one letter); even: hi = lo + 1 // @viz center
            while (lo >= 0 && hi < n && s[lo] == s[hi]) { // grow while the ends match // @viz grow
                ++count; // each step outward is one more palindrome // @viz grow
                --lo; // @viz grow
                ++hi; // @viz grow
            }
        }
        return count; // @viz return
    }
};
