#include <algorithm>
#include <vector>
class Solution {
public:
    int maxCoins(std::vector<int>& nums) {
        a = {1}; // padding: the ends act like balloons worth 1 that never burst // @viz init
        a.insert(a.end(), nums.begin(), nums.end()); // @viz init
        a.push_back(1); // @viz init
        memo.assign(a.size(), std::vector<int>(a.size(), -1)); // @viz init
        return best(0, a.size() - 1); // @viz return
    }
private:
    std::vector<int> a;
    std::vector<std::vector<int>> memo;
    int best(int lo, int hi) { // the most coins from bursting every balloon strictly between lo and hi // @viz call
        if (lo + 1 == hi) return 0; // nothing in between // @viz base
        int& m = memo[lo][hi]; // @viz memo
        if (m >= 0) return m; // @viz memo
        for (int k = lo + 1; k < hi; ++k) // pick k, the LAST balloon burst in here: when it goes, lo and hi are its neighbours // @viz last
            m = std::max(m, best(lo, k) + a[lo] * a[k] * a[hi] + best(k, hi)); // @viz last
        return m; // @viz memo
    }
};
