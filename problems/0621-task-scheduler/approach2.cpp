#include <array>
#include <queue>
#include <utility>
#include <vector>
class Solution {
public:
    int leastInterval(std::vector<char>& tasks, int n) {
        std::array<int, 26> counts{}; // @viz init
        for (char t : tasks) ++counts[t - 'A']; // @viz init
        std::priority_queue<int> heap; // a max-heap of counts // @viz init
        for (int c : counts) if (c) heap.push(c); // @viz init
        std::queue<std::pair<int, int>> waiting; // (count left, time it may run again), in the order they ran // @viz init
        int time = 0; // @viz init
        while (!heap.empty() || !waiting.empty()) { // @viz tick
            ++time; // @viz tick
            if (!heap.empty()) { // run the task with the most left // @viz run
                int c = heap.top() - 1; // @viz run
                heap.pop(); // @viz run
                if (c) waiting.push({c, time + n}); // some left: it waits n units // @viz run
            }
            if (!waiting.empty() && waiting.front().second == time) { // its wait is over: back in the heap // @viz back
                heap.push(waiting.front().first); // @viz back
                waiting.pop(); // @viz back
            }
        }
        return time; // @viz return
    }
};
