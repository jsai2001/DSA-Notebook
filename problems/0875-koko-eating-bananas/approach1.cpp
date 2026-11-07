#include <vector>
class Solution {
public:
    int minEatingSpeed(std::vector<int>& piles, int h) {
        for (long long k = 1;; ++k) { // try every speed, slowest first // @viz init, try, next
            long long hours = 0; // can pass 2^31 // @viz try
            for (int p : piles) hours += (p + k - 1) / k; // ceil(p / k) hours per pile // @viz try
            if (hours <= h) return k; // the first speed that's fast enough // @viz return
        }
    }
};
