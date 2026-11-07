#include <algorithm>
#include <unordered_map>
#include <vector>
class Solution {
public:
    int maxCoins(std::vector<int>& nums) {
        a = nums; // @viz init
        memo.clear(); // remaining balloons (as a bitmask) -> the most coins from bursting them all // @viz init
        return best((1 << a.size()) - 1); // every balloon is still there // @viz return
    }
private:
    std::vector<int> a;
    std::unordered_map<int, int> memo;
    int best(int mask) { // @viz call
        if (mask == 0) return 0; // @viz base
        auto it = memo.find(mask); // @viz memo
        if (it != memo.end()) return it->second; // @viz memo
        std::vector<int> alive; // @viz memo
        for (int i = 0; i < (int)a.size(); ++i) if (mask >> i & 1) alive.push_back(i); // @viz memo
        int top = 0; // @viz try
        for (size_t k = 0; k < alive.size(); ++k) { // burst balloon alive[k] next: its neighbours are the nearest alive ones // @viz try
            int left = k > 0 ? a[alive[k - 1]] : 1; // @viz try
            int right = k + 1 < alive.size() ? a[alive[k + 1]] : 1; // @viz try
            top = std::max(top, left * a[alive[k]] * right + best(mask & ~(1 << alive[k]))); // @viz try
        }
        return memo[mask] = top; // @viz memo
    }
};
