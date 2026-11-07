#include <vector>
class Solution {
public:
    std::vector<int> countBits(int n) {
        std::vector<int> ans(n + 1, 0); // ans[0] = 0 // @viz init
        for (int i = 1; i <= n; ++i) // @viz num
            ans[i] = ans[i & (i - 1)] + 1; // i with its lowest 1 cleared is smaller and already known // @viz store
        return ans; // @viz return
    }
};
