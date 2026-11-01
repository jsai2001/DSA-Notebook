#include <algorithm>
#include <vector>
class Solution {
public:
    int jump(std::vector<int>& nums) {
        int jumps = 0; // @viz init
        int end = 0; // the last index reachable with `jumps` jumps // @viz init
        int farthest = 0; // the furthest index reachable with one more jump // @viz init
        for (int i = 0; i + 1 < (int)nums.size(); ++i) { // not the last index: standing there needs no more jumps // @viz scan
            farthest = std::max(farthest, i + nums[i]); // @viz scan
            if (i == end) { // every index of this jump count has been looked at // @viz level
                ++jumps; // take one more jump // @viz level
                end = farthest; // it can land anywhere up to farthest // @viz level
            }
        }
        return jumps; // @viz return
    }
};
