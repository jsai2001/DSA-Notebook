#include <algorithm>
#include <vector>
class Solution {
public:
    int minEatingSpeed(std::vector<int>& piles, int h) {
        int lo = 1, hi = *std::max_element(piles.begin(), piles.end()); // at max(piles), every pile takes one hour // @viz init
        while (lo < hi) { // the answer is in [lo, hi] // @viz loop
            int k = lo + (hi - lo) / 2; // @viz mid
            long long hours = 0; // can pass 2^31 // @viz mid
            for (int p : piles) hours += (p + (long long)k - 1) / k; // @viz mid
            if (hours <= h) hi = k; // k is fast enough: the answer is k or slower // @viz fast
            else lo = k + 1; // too slow: the answer is faster than k // @viz slow
        }
        return lo; // @viz return
    }
};
