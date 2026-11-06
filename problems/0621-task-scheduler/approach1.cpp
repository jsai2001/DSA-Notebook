#include <array>
#include <vector>
class Solution {
public:
    int leastInterval(std::vector<char>& tasks, int n) {
        std::array<int, 26> left{}; // how many of each letter are still to run // @viz init
        for (char t : tasks) ++left[t - 'A']; // @viz init
        std::array<int, 26> ready{}; // the first time each letter may run again // @viz init
        int time = 0, remaining = (int)tasks.size(); // @viz init
        while (remaining) { // one loop per time unit // @viz tick
            int pick = -1; // @viz pick
            for (int c = 0; c < 26; ++c) // of the letters allowed now, the one with the most left // @viz pick
                if (left[c] && ready[c] <= time && (pick < 0 || left[c] > left[pick])) pick = c; // @viz pick
            if (pick >= 0) { // run it, then it must wait n units // @viz run
                --left[pick]; // @viz run
                ready[pick] = time + n + 1; // @viz run
                --remaining; // @viz run
            }
            ++time; // nothing allowed: this unit is idle // @viz idle
        }
        return time; // @viz return
    }
};
