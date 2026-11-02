#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        int top = 0; // @viz init
        for (const auto& in : intervals) top = std::max(top, in[1]); // @viz init
        std::vector<int> starts(top + 1, 0); // starts[x]: how many intervals begin at x // @viz init
        std::vector<int> ends(top + 1, 0); // ends[x]: how many intervals finish at x // @viz init
        for (const auto& in : intervals) { // @viz count
            ++starts[in[0]]; // @viz count
            ++ends[in[1]]; // @viz count
        }
        std::vector<std::vector<int>> merged; // @viz prep
        int active = 0, begin = 0; // active: intervals open right now // @viz prep
        for (int x = 0; x <= top; ++x) { // sweep left to right // @viz sweep
            if (active == 0 && starts[x] > 0) begin = x; // nothing was open: a merged interval begins here // @viz begin
            active += starts[x]; // count every start and end at x before checking for a close // @viz sweep
            active -= ends[x]; // @viz sweep
            if (active == 0 && ends[x] > 0) merged.push_back({begin, x}); // the last open interval just closed // @viz close
        }
        return merged; // @viz return
    }
};
