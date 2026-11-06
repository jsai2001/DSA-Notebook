#include <algorithm>
#include <array>
#include <vector>
class Solution {
public:
    int leastInterval(std::vector<char>& tasks, int n) {
        std::array<int, 26> counts{}; // @viz count
        for (char t : tasks) ++counts[t - 'A']; // @viz count
        int most = *std::max_element(counts.begin(), counts.end()); // the most frequent task runs this many times // @viz count
        int tied = (int)std::count(counts.begin(), counts.end(), most); // how many tasks share that count // @viz count
        // The most frequent tasks need most - 1 full blocks of n + 1 units, then one last block of size tied.
        int frame = (most - 1) * (n + 1) + tied; // @viz frame
        return std::max(frame, (int)tasks.size()); // with many kinds of task the gaps all fill, and no idle is needed // @viz return
    }
};
