#include <algorithm>
#include <set>
#include <vector>
class Solution {
public:
    bool mergeTriplets(std::vector<std::vector<int>>& triplets, std::vector<int>& target) {
        std::set<std::vector<int>> seen; // every triplet you can make by merging some of them // @viz init
        for (auto& t : triplets) { // @viz add
            std::set<std::vector<int>> next(seen); // @viz add
            next.insert(t); // use t alone // @viz add
            for (auto& s : seen) next.insert({std::max(s[0], t[0]), std::max(s[1], t[1]), std::max(s[2], t[2])}); // or merge it into one so far // @viz add
            seen.swap(next); // @viz add
            if (seen.count(target)) return true; // @viz found
        }
        return false; // @viz return
    }
};
