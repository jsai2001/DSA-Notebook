#include <numeric>
#include <vector>
class Solution {
public:
    int minEatingSpeed(std::vector<int>& piles, int h) {
        long long total = std::accumulate(piles.begin(), piles.end(), 0LL); // @viz init
        for (long long k = (total + h - 1) / h;; ++k) { // slower than sum / h can't finish; try every speed from there // @viz init, try, next
            long long hours = 0; // @viz try
            for (int p : piles) hours += (p + k - 1) / k; // @viz try
            if (hours <= h) return k; // @viz return
        }
    }
};
