#include <algorithm>
class Solution {
public:
    int uniquePaths(int m, int n) {
        // A path is m - 1 moves down and n - 1 moves right, in some order:
        // the answer is how many ways to choose which of the m + n - 2 moves go down.
        int total = m + n - 2, k = std::min(m, n) - 1; // C(total, k); the smaller k means fewer steps // @viz init
        long long result = 1; // 64-bit: result * (...) goes past 2^31 before the division // @viz init
        for (int i = 1; i <= k; ++i) { // @viz step
            result = result * (total - k + i) / i; // now C(total - k + i, i): always a whole number // @viz step
        }
        return (int)result; // @viz answer
    }
};
