#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> kClosest(std::vector<std::vector<int>>& points, int k) {
        std::priority_queue<std::pair<int, int>> heap; // max-heap of (distance, index): the k closest so far // @viz init
        for (int i = 0; i < (int)points.size(); ++i) { // @viz push
            heap.push({points[i][0] * points[i][0] + points[i][1] * points[i][1], i}); // @viz push
            if ((int)heap.size() > k) heap.pop(); // one too many: drop the farthest // @viz pop
        }
        std::vector<std::vector<int>> ans; // @viz return
        for (; !heap.empty(); heap.pop()) ans.push_back(points[heap.top().second]); // @viz return
        return ans; // @viz return
    }
};
