#include <algorithm>
#include <map>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::map<int, int> tally; // value -> how many times it appears; a map keeps the values sorted // @viz count
        for (int c : candidates) tally[c]++; // @viz count
        counts.assign(tally.begin(), tally.end()); // @viz count
        result.clear(); // @viz count
        path.clear(); // @viz count
        backtrack(0, target); // @viz start
        return result; // @viz return
    }
private:
    std::vector<std::pair<int, int>> counts; // (value, how many), smallest first
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    void backtrack(int k, int remaining) { // decide how many copies of the k-th distinct value to use // @viz call
        if (remaining == 0) { // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        if (k == (int)counts.size() || counts[k].first > remaining) return; // no values left, or this and every later one too big // @viz dead
        int value = counts[k].first; // @viz none
        int most = std::min(counts[k].second, remaining / value); // can't use more copies than exist, or than fit // @viz none
        backtrack(k + 1, remaining); // use no copies of value // @viz none
        for (int used = 1; used <= most; ++used) { // then 1 copy, 2 copies, ... most copies // @viz copies
            path.push_back(value); // @viz copies
            backtrack(k + 1, remaining - used * value); // @viz copies
        }
        path.resize(path.size() - most); // take those copies off again // @viz undo
    }
};
