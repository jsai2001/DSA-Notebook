#include <algorithm>
#include <vector>
class Solution {
public:
    bool mergeTriplets(std::vector<std::vector<int>>& triplets, std::vector<int>& target) {
        std::vector<int> merged(3, 0); // @viz init
        for (auto& t : triplets) // @viz scan
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) // safe: it can't push any value past the target // @viz merge
                for (int k = 0; k < 3; ++k) merged[k] = std::max(merged[k], t[k]); // @viz merge
        return merged == target; // merging every safe triplet gets as close as possible // @viz return
    }
};
