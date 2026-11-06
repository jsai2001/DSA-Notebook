#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        sorted = nums; // @viz init
        std::sort(sorted.begin(), sorted.end()); // equal numbers side by side // @viz init
        result.clear(); // @viz init
        path.clear(); // @viz init
        backtrack(0); // @viz init
        return result; // @viz return
    }
private:
    std::vector<int> sorted, path;
    std::vector<std::vector<int>> result;
    void backtrack(size_t start) { // path is a subset; extend it only with numbers after it // @viz call
        result.push_back(path); // every path is an answer, even the empty one // @viz record
        for (size_t i = start; i < sorted.size(); ++i) { // @viz choose
            if (i > start && sorted[i] == sorted[i - 1]) continue; // same number in the same place: same subsets again // @viz dup
            path.push_back(sorted[i]); // @viz choose
            backtrack(i + 1); // @viz choose
            path.pop_back(); // undo, so the next number can take this place // @viz undo
        }
    }
};
