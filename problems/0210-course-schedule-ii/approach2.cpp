#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<int> findOrder(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        after.assign(numCourses, {}); // after[b] = courses that need b // @viz init
        for (auto& p : prerequisites) after[p[1]].push_back(p[0]); // @viz init
        state.assign(numCourses, 0); // 0 = not visited, 1 = on the current path, 2 = finished // @viz init
        post.clear(); // courses in the order they finish: every course after c finishes before c // @viz init
        for (int c = 0; c < numCourses; ++c) // @viz loop
            if (dfs(c)) return {}; // @viz loop
        std::reverse(post.begin(), post.end()); // reversed finish order: each course before everything that needs it // @viz return
        return post; // @viz return
    }
private:
    std::vector<std::vector<int>> after;
    std::vector<int> state, post;
    bool dfs(int c) { // true if a cycle is found // @viz visit
        if (state[c] == 1) return true; // back on the current path: a cycle // @viz back
        if (state[c] == 2) return false; // @viz seen
        state[c] = 1; // @viz visit
        for (int next : after[c]) // @viz edge
            if (dfs(next)) return true; // @viz edge
        state[c] = 2; // @viz finish
        post.push_back(c); // @viz finish
        return false; // @viz finish
    }
};
