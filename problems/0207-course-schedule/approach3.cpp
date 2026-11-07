#include <queue>
#include <vector>
class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<std::vector<int>> after(numCourses); // after[b] = courses that need b // @viz init
        std::vector<int> need(numCourses, 0); // prerequisites not taken yet // @viz init
        for (auto& p : prerequisites) { // @viz init
            after[p[1]].push_back(p[0]); // @viz init
            ++need[p[0]]; // @viz init
        }
        std::queue<int> queue; // courses you can take now // @viz start
        for (int c = 0; c < numCourses; ++c) if (need[c] == 0) queue.push(c); // @viz start
        int taken = 0; // @viz start
        while (!queue.empty()) { // @viz take
            int c = queue.front(); // @viz take
            queue.pop(); // @viz take
            ++taken; // @viz take
            for (int next : after[c]) // @viz free
                if (--need[next] == 0) queue.push(next); // one fewer prerequisite to wait for // @viz free
        }
        return taken == numCourses; // courses on a cycle never reach need 0 // @viz return
    }
};
