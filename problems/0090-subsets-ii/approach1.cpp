#include <algorithm>
#include <set>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        sorted = nums; // @viz init
        std::sort(sorted.begin(), sorted.end()); // equal subsets now come out in the same order: [1,2] never [2,1] // @viz init
        seen.clear(); // @viz init
        path.clear(); // @viz init
        backtrack(0); // @viz init
        return std::vector<std::vector<int>>(seen.begin(), seen.end()); // @viz return
    }
private:
    std::vector<int> sorted, path;
    std::set<std::vector<int>> seen; // a set keeps one copy of each
    void backtrack(size_t i) { // decide sorted[i], sorted[i+1], ... // @viz call
        if (i == sorted.size()) { // @viz done
            seen.insert(path); // @viz done
            return; // @viz done
        }
        path.push_back(sorted[i]); // take sorted[i] // @viz take
        backtrack(i + 1); // @viz take
        path.pop_back(); // leave it out // @viz skip
        backtrack(i + 1); // @viz skip
    }
};
