#include <vector>
class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        after.assign(numCourses, {}); // after[b] = courses that need b // @viz init
        for (auto& p : prerequisites) after[p[1]].push_back(p[0]); // @viz init
        state.assign(numCourses, 0); // 0 = not visited, 1 = on the current path, 2 = finished, no cycle // @viz init
        for (int c = 0; c < numCourses; ++c) // @viz return
            if (hasCycle(c)) return false; // @viz return
        return true; // @viz return
    }
private:
    std::vector<std::vector<int>> after;
    std::vector<int> state;
    bool hasCycle(int c) { // @viz visit
        if (state[c] == 1) return true; // back to a course still on the path: a cycle // @viz back
        if (state[c] == 2) return false; // already checked // @viz seen
        state[c] = 1; // @viz visit
        for (int next : after[c]) // @viz edge
            if (hasCycle(next)) return true; // @viz edge
        state[c] = 2; // every path from c is cycle-free // @viz finish
        return false; // @viz finish
    }
};
