#include <algorithm>
#include <queue>
#include <vector>
class Solution {
public:
    int jump(std::vector<int>& nums) {
        int n = (int)nums.size();
        std::vector<int> dist(n, 0); // dist[i]: jumps used to reach i // @viz init
        std::queue<int> queue; // @viz init
        queue.push(0); // @viz init
        int reached = 0; // the furthest index already in the queue // @viz init
        while (!queue.empty()) { // @viz pop
            int i = queue.front(); // indices come out in order of jumps used // @viz pop
            queue.pop(); // @viz pop
            if (i == n - 1) return dist[i]; // the first time the last index comes out is the fewest jumps // @viz done
            for (int j = reached + 1; j <= std::min(n - 1, i + nums[i]); ++j) { // only indices nobody has queued yet // @viz push
                dist[j] = dist[i] + 1; // @viz push
                queue.push(j); // @viz push
            }
            reached = std::max(reached, i + nums[i]); // @viz push
        }
        return -1; // not reached: the problem guarantees this can't happen
    }
};
