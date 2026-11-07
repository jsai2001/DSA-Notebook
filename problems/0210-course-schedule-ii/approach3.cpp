#include <queue>
#include <vector>
class Solution {
public:
    std::vector<int> findOrder(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<std::vector<int>> after(numCourses); // after[b] = courses that need b // @viz init
        std::vector<int> need(numCourses, 0); // prerequisites not taken yet // @viz init
        for (auto& p : prerequisites) { // @viz init
            after[p[1]].push_back(p[0]); // @viz init
            ++need[p[0]]; // @viz init
        }
        std::queue<int> queue; // courses you can take now // @viz start
        for (int c = 0; c < numCourses; ++c) if (need[c] == 0) queue.push(c); // @viz start
        std::vector<int> order; // @viz start
        while (!queue.empty()) { // @viz take
            int c = queue.front(); // @viz take
            queue.pop(); // @viz take
            order.push_back(c); // @viz take
            for (int next : after[c]) // @viz free
                if (--need[next] == 0) queue.push(next); // all of its prerequisites are taken now // @viz free
        }
        if ((int)order.size() < numCourses) return {}; // some course never reached 0: a cycle // @viz return
        return order; // @viz return
    }
};
