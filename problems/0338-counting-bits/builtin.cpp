#include <vector>
class Solution {
public:
    std::vector<int> countBits(int n) {
        std::vector<int> ans(n + 1);
        for (int i = 0; i <= n; ++i) ans[i] = __builtin_popcount(i); // GCC/Clang; C++20: std::popcount
        return ans;
    }
};
