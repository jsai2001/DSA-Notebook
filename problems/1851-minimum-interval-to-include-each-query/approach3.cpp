#include <algorithm>
#include <functional>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<int> minInterval(std::vector<std::vector<int>>& intervals, std::vector<int>& queries) {
        auto iv = intervals; // @viz init
        std::sort(iv.begin(), iv.end()); // by left end // @viz init
        std::vector<int> qs(queries); // @viz init
        std::sort(qs.begin(), qs.end()); // queries from left to right // @viz init
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap; // (size, right) // @viz init
        std::unordered_map<int, int> at; // @viz init
        size_t i = 0; // @viz init
        for (int q : qs) { // @viz query
            while (i < iv.size() && iv[i][0] <= q) { heap.push({iv[i][1] - iv[i][0] + 1, iv[i][1]}); ++i; } // add every interval that has started // @viz push
            while (!heap.empty() && heap.top().second < q) heap.pop(); // ended before q: later queries are bigger, so drop it for good // @viz pop
            at[q] = heap.empty() ? -1 : heap.top().first; // @viz answer
        }
        std::vector<int> ans; // back in the original order // @viz return
        for (int q : queries) ans.push_back(at[q]); // @viz return
        return ans; // @viz return
    }
};
