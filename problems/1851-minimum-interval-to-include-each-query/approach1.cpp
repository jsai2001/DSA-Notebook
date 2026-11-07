#include <vector>
class Solution {
public:
    std::vector<int> minInterval(std::vector<std::vector<int>>& intervals, std::vector<int>& queries) {
        std::vector<int> ans; // @viz init
        for (int q : queries) { // @viz query
            int best = -1; // @viz query
            for (auto& iv : intervals) // check every interval // @viz check
                if (iv[0] <= q && q <= iv[1] && (best == -1 || iv[1] - iv[0] + 1 < best)) best = iv[1] - iv[0] + 1; // contains q and is smaller // @viz check
            ans.push_back(best); // @viz answer
        }
        return ans; // @viz return
    }
};
