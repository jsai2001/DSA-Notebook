#include <algorithm>
#include <vector>
class Solution {
public:
    int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
        auto iv = intervals; // @viz init
        std::sort(iv.begin(), iv.end()); // by start // @viz init
        int n = iv.size(); // @viz init
        std::vector<int> keep(n, 1); // keep[i]: most intervals kept from iv[0..i], ending with iv[i] // @viz init
        for (int i = 0; i < n; ++i) // @viz dp
            for (int j = 0; j < i; ++j) // @viz dp
                if (iv[j][1] <= iv[i][0]) keep[i] = std::max(keep[i], keep[j] + 1); // iv[j] ends before iv[i] starts // @viz dp
        return n - *std::max_element(keep.begin(), keep.end()); // remove everything else // @viz return
    }
};
