#include <vector>
class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<char> done(numCourses, 0); // @viz init
        int left = numCourses; // @viz init
        while (left) { // one round: take every course whose prerequisites are all done // @viz round
            std::vector<int> need(numCourses, 0); // prerequisites not done yet, per course // @viz count
            for (auto& p : prerequisites) // p[1] must come before p[0] // @viz count
                if (!done[p[1]]) ++need[p[0]]; // @viz count
            std::vector<int> ready; // @viz ready
            for (int c = 0; c < numCourses; ++c) // @viz ready
                if (!done[c] && need[c] == 0) ready.push_back(c); // @viz ready
            if (ready.empty()) return false; // courses are left, but each waits on another: a cycle // @viz stuck
            for (int c : ready) done[c] = 1; // @viz take
            left -= ready.size(); // @viz take
        }
        return true; // @viz return
    }
};
