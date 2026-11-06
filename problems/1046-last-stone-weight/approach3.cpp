#include <queue>
#include <vector>
class Solution {
public:
    int lastStoneWeight(std::vector<int>& stones) {
        std::priority_queue<int> heap(stones.begin(), stones.end()); // a max-heap: top() is the heaviest // @viz init
        while (heap.size() > 1) { // @viz loop
            int y = heap.top(); // heaviest // @viz take
            heap.pop(); // @viz take
            int x = heap.top(); // second heaviest // @viz take
            heap.pop(); // @viz take
            if (y != x) heap.push(y - x); // equal stones both break; otherwise y - x goes back in // @viz smash
        }
        return heap.empty() ? 0 : heap.top(); // @viz return
    }
};
