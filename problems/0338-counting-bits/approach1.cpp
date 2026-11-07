#include <vector>
class Solution {
public:
    std::vector<int> countBits(int n) {
        std::vector<int> ans; // @viz init
        for (int i = 0; i <= n; ++i) { // count each number on its own // @viz num
            int x = i, c = 0; // @viz num
            while (x) { // one round per 1 bit // @viz clear
                x &= x - 1; // clear the lowest 1 // @viz clear
                ++c; // @viz clear
            }
            ans.push_back(c); // @viz store
        }
        return ans; // @viz return
    }
};
